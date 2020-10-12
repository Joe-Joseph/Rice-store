import moment from 'moment';
// import { Op } from 'sequelize';
import model from '../models';
import formatError from '../helpers/errorMessages';
import handleErrors from '../helpers/errorHandler';

const { errorName } = formatError;

const { stores } = model;

const createStoreResolver = async (args, req) => {
  handleErrors(req.isAuth, errorName.UNAUTHORIZED);
  const employee = await req.user;
  const { id } = employee;

  const myStore = await stores.findOne({
    where: {
      userId: id
    }
  });

  if (myStore) {
    throw Error('You can not create more than 1 store');
  }

  const storeExist = await stores.findOne({
    where: {
      storeLocation: args.storeLocation.toLowerCase()
    }
  });

  if (storeExist) {
    throw Error(`${storeExist.storeLocation} already exist`);
  }

  const storeInfo = {
    storeLocation: args.storeLocation.toLowerCase(),
    userId: id,
  };

  const store = await stores.create(storeInfo);
  return store;
};

const getAllStoresResolver = async (req) => {
  handleErrors(req.isAuth, errorName.UNAUTHORIZED);

  const allStores = await stores.findAll();
  const returnedData = [];
  allStores.forEach((element) => {
    const { createdAt } = element.dataValues;
    const store = { ...element.dataValues, createdAt: moment(createdAt).format('MMMM Do YYYY, h:mm:ss a') };

    returnedData.push(store);
  });

  return returnedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
};

export {
  createStoreResolver,
  getAllStoresResolver
};
