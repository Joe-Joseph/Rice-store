/* eslint-disable no-unused-expressions */
import moment from 'moment';
import model from '../models';
import formatError from '../helpers/errorMessages';
import getAllTransactions from '../helpers/getAllTransactions';
import findOneTransaction from '../helpers/findTransaction';
import handleErrors from '../helpers/errorHandler';

const { errorName } = formatError;

const { products, transactions } = model;

const addProductResolver = async (args, req) => {
  handleErrors(req.isAuth, errorName.UNAUTHORIZED);

  const employee = await req.user;
  const { firstName, lastName, id } = employee;

  const product = await products.findOne({
    where: {
      bagSize: args.bagSize,
      productName: args.productName.toLowerCase(),
      userId: id
    }
  });

  if (!product) {
    throw new Error('Product not found');
  }

  const productInfo = {
    productId: product.productId,
    oneBagCost: 0,
    quantity: args.quantity,
    userId: id,
    transactionType: 'added',
    totalCost: 0
  };

  const registeredProduct = await transactions.create(productInfo);
  const updated = await product.update({
    quantity: product.quantity + registeredProduct.quantity
  });

  const { quantity, oneBagCost } = registeredProduct;

  const registeredProductInfo = {
    ...registeredProduct.dataValues,
    productName: product.productName,
    productType: product.productType,
    employee: `${firstName} ${lastName}`,
    totalBags: `${product.totalBags} bags`,
    bagSize: `${product.bagSize} kg`,
    quantity: `${quantity} bags`,
    oneBagCost,
    currentQuantity: `${updated.quantity} bags`,
  };

  return registeredProductInfo;
};

const sellProductResolver = async (args, req) => {
  handleErrors(req.isAuth, errorName.UNAUTHORIZED);

  const employee = await req.user;
  const { firstName, lastName, id } = employee;

  const product = await products.findOne({
    where: {
      bagSize: args.bagSize,
      productName: args.productName.toLowerCase(),
      userId: id
    }
  });

  const { productId, productName, productType } = product;

  if (product.quantity < args.quantity) {
    throw new Error(`We have ${product.quantity} ${productName} in stock`);
  }

  const productInfo = {
    productId,
    oneBagCost: args.oneBagCost,
    quantity: args.quantity,
    userId: id,
    transactionType: 'sold',
    totalCost: args.oneBagCost * args.quantity
  };
  const updated = await product.update({
    quantity: product.quantity - args.quantity
  });

  const registeredProduct = await transactions.create(productInfo);

  const { quantity, oneBagCost } = registeredProduct;

  const registeredProductInfo = {
    ...registeredProduct.dataValues,
    productName,
    productType,
    employee: `${firstName} ${lastName}`,
    bagSize: `${registeredProduct.bagSize} kg`,
    quantity: `${quantity} bags`,
    oneBagCost,
    currentQuantity: `${updated.quantity} bags`,
  };

  return registeredProductInfo;
};

const getAllTransactionsResolver = async (args, req) => {
  handleErrors(req.isAuth, errorName.UNAUTHORIZED);

  const user = await req.user;
  const { id } = user;

  const allTransactions = await transactions.findAll({ where: { userId: id } });
  handleErrors(allTransactions, 'Transaction not found');

  const transactionsFound = getAllTransactions(allTransactions);
  return transactionsFound;
};

const getOneTransactionResolver = async (args, req) => {
  handleErrors(req.isAuth, errorName.UNAUTHORIZED);

  const user = await req.user;
  const { id } = user;

  // eslint-disable-next-line max-len
  const transaction = await transactions.findOne({ where: { transactionId: args.transactionId, userId: id } });
  handleErrors(transaction, 'Transaction not found');

  const newTransaction = {
    ...transaction.dataValues,
    createdAt: moment(transaction.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
  };

  return newTransaction;
};

const updateTransactionResolver = async (args, req) => {
  handleErrors(req.isAuth, errorName.UNAUTHORIZED);

  const user = await req.user;
  const { id } = user;

  const transaction = await findOneTransaction(args.transactionId, id);
  handleErrors(transaction, 'Transaction not found');

  const { productId } = transaction.dataValues;
  const product = await products.findOne({ where: { productId } });
  const removePreviousQuantity = product.quantity - transaction.quantity;

  const updatedTransaction = await transaction.update({
    quantity: args.quantity || transaction.quantity
  });

  await product.update({ quantity: removePreviousQuantity + updatedTransaction.quantity });
  return updatedTransaction;
};

const deleteOneTransactionResolver = async (args, req) => {
  handleErrors(req.isAuth, errorName.UNAUTHORIZED);

  const user = await req.user;
  const { id } = user;

  const transaction = await findOneTransaction(args.transactionId, id);
  handleErrors(transaction, 'Transaction not found');

  const { productId } = transaction.dataValues;
  const product = await products.findOne({ where: { productId } });
  if (transaction.transactionType === 'sold') {
    product.quantity += transaction.quantity;
    product.save();
  } else if (transaction.transactionType === 'added') {
    product.quantity -= transaction.quantity;
    product.save();
  }

  await transaction.destroy();
  return 'Transaction deleted';
};

const deleteTransactionResolver = async (req) => {
  handleErrors(req.isAuth, errorName.UNAUTHORIZED);
  await transactions.destroy({ truncate: true });

  return { message: 'Transaction deleted successfuly' };
};

export {
  getAllTransactionsResolver,
  getOneTransactionResolver,
  updateTransactionResolver,
  deleteTransactionResolver,
  addProductResolver,
  sellProductResolver,
  deleteOneTransactionResolver
};
