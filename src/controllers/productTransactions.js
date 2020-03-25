import moment from 'moment';
import model from '../models';
import formatError from '../helpers/errorMessages';
import findLastRoundId from '../helpers/lastAddedRoundIndex';
import findOneTransaction from '../helpers/findTransaction';
import handleErrors from '../helpers/errorHandler';
import findOneUser from '../helpers/findOneUser';

const { errorName } = formatError;

const { products } = model;

const getTransctionsByRoundResolver = async (args, req) => {
  handleErrors(req.isAuth, errorName.UNAUTHORIZED);
  const employee = await req.user;
  const { id } = employee;

  const lastRoundId = await findLastRoundId();
  handleErrors(lastRoundId, 'Round does not exist yet.');

  const transactions = await products.findAll({ where: { roundId: lastRoundId }, order: [['createdAt', 'DESC']] });

  const allTransactions = [];
  const user = await findOneUser({ where: { userId: id } });
  const { dataValues: { firstName, lastName } } = user;

  transactions.forEach(async (element) => {
    const { dataValues } = element;

    const data = {
      ...dataValues,
      employee: `${firstName} ${lastName}`,
      createdAt: moment(dataValues.createdAt).format('MMMM Do YYYY, h:mm:ss a')
    };
    allTransactions.push(data);
  });
  return allTransactions;
};

const getOneTransactionResolver = async (args, req) => {
  handleErrors(req.isAuth, errorName.UNAUTHORIZED);

  const transaction = await products.findOne({ where: { transactionId: args.transactionId } });

  handleErrors(transaction, 'Transaction not found');

  const newTransaction = {
    ...transaction.dataValues,
    createdAt: moment(transaction.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
  };

  return newTransaction;
};

const updateTransactionResolver = async (args, req) => {
  handleErrors(req.isAuth, errorName.UNAUTHORIZED);

  const transaction = await findOneTransaction(args.transactionId);

  handleErrors(transaction, 'Transaction not found');

  const updatedTransaction = await transaction.update({
    productName: args.productName || transaction.productName,
    bagSize: args.bagSize || transaction.bagSize,
    addedQuantity: args.addedQuantity || transaction.addedQuantity
  });

  return updatedTransaction;
};

const deleteTransactionResolver = async (args, req) => {
  handleErrors(req.isAuth, errorName.UNAUTHORIZED);

  const transaction = await findOneTransaction(args.transactionId);

  handleErrors(transaction, 'Transaction not found');

  await products.destroy({ where: { transactionId: args.transactionId }, returning: true });

  return { message: 'Transaction deleted successfuly' };
};

export {
  getTransctionsByRoundResolver,
  getOneTransactionResolver,
  updateTransactionResolver,
  deleteTransactionResolver
};
