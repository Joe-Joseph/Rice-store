/* eslint-disable no-unused-expressions */
import moment from 'moment';
import model from '../models';
import formatError from '../helpers/errorMessages';
import handleErrors from '../helpers/errorHandler';

const { errorName } = formatError;

const { products, stores } = model;

const registerProduct = async (args, req) => {
  handleErrors(req.isAuth, errorName.UNAUTHORIZED);
  const { productName, productType } = args;
  const user = await req.user;

  const store = await stores.findOne({
    where: {
      userId: user.id
    }
  });
  if (!store) {
    throw Error('Create store before creating product');
  }

  const findProduct = await products.findOne({
    where: {
      bagSize: args.bagSize,
      productName: productName.toLowerCase(),
      userId: user.id
    }
  });

  if (findProduct) {
    throw new Error(`${productName} ${productType} already exist`);
  }

  const product = {
    productName: productName.toLowerCase(),
    productType: productType.toLowerCase(),
    storeId: store.dataValues.storeId,
    userId: user.id,
    bagSize: args.bagSize,
    quantity: 0,
    totalBags: 0
  };

  const registeredProduct = await products.create(product);
  const { bagSize, totalBags } = registeredProduct;

  const registeredProductInfo = {
    ...registeredProduct.dataValues,
    totalBags: `${totalBags} bags`,
    bagSize: `${bagSize} kg`,
  };

  return registeredProductInfo;
};

const getAllProductsResolver = async (args, req) => {
  handleErrors(req.isAuth, errorName.UNAUTHORIZED);
  const user = await req.user;

  const allProducts = await products.findAll({ where: { userId: user.id } });
  const productsArray = [];
  handleErrors(allProducts, 'Transaction not found');

  (allProducts.length > 0) && allProducts.forEach((element) => {
    const { dataValues } = element;
    const data = {
      ...dataValues,
      createdAt: moment(dataValues.createdAt).format('MMMM Do YYYY, h:mm:ss a')
    };

    productsArray.push(data);
  });

  return productsArray;
};

const getOneProductResolver = async (args, req) => {
  handleErrors(req.isAuth, errorName.UNAUTHORIZED);

  const product = await products.findOne({ where: { productId: args.productId } });
  handleErrors(product, 'Transaction not found');

  const newProduct = {
    ...product.dataValues,
    createdAt: moment(product.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
  };

  return newProduct;
};


export {
  registerProduct,
  getAllProductsResolver,
  getOneProductResolver
};
