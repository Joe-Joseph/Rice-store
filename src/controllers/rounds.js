import moment from 'moment';
import model from '../models';
import formatError from '../helpers/errorMessages';
import findLastRoundId from '../helpers/lastAddedRoundIndex';
import findOneUser from '../helpers/findOneUser';
import { findTotalBagsByKg, findTotalBags } from '../helpers/totalBagsByKg';
import handleErrors from '../helpers/errorHandler';

const { errorName } = formatError;

const { rounds, products } = model;

const registerRoundResolver = async (args, req) => {
  handleErrors(req.isAuth, errorName.UNAUTHORIZED);

  const employee = await req.user;
  const { id } = employee;
  const roundInfo = {
    carPlate: args.carPlate,
    driverName: args.driverName,
    employeId: id
  };

  const registeredRound = await rounds.create(roundInfo);
  return registeredRound;
};

const addProductResolver = async (args, req) => {
  handleErrors(req.isAuth, errorName.UNAUTHORIZED);
  const employee = await req.user;
  const { id } = employee;

  const roundId = await findLastRoundId();

  const totalSoldBagsByKg = await findTotalBagsByKg(args.bagSize, 'sold');
  const totalAddedBagsByKg = await findTotalBagsByKg(args.bagSize, 'added');
  const totalAddedBags = await findTotalBags('added');
  const totalSoldBags = await findTotalBags('sold');

  const remainingTotalBags = totalAddedBags - totalSoldBags;

  const remainingBags = totalAddedBagsByKg - totalSoldBagsByKg;

  const user = await findOneUser({ where: { userId: id } });
  const { dataValues: { firstName, lastName } } = user;

  const productInfo = {
    productName: args.productName,
    bagSize: args.bagSize,
    oneBagCost: 0,
    addedQuantity: args.addedQuantity,
    currentQuantity: remainingBags + args.addedQuantity,
    totalBags: remainingTotalBags + args.addedQuantity,
    roundId,
    userId: id,
    transactionType: 'added',
    totalCost: 0
  };

  const registeredProduct = await products.create(productInfo);
  const {
    bagSize, addedQuantity, currentQuantity, totalBags
  } = registeredProduct;

  const registeredProductInfo = {
    ...registeredProduct.dataValues,
    employee: `${firstName} ${lastName}`,
    totalBags: `${totalBags} bags`,
    bagSize: `${bagSize} kg`,
    addedQuantity: `${addedQuantity} bags`,
    currentQuantity: `${currentQuantity} bags`
  };

  return registeredProductInfo;
};

const sellProductResolver = async (args, req) => {
  handleErrors(req.isAuth, errorName.UNAUTHORIZED);

  const employee = await req.user;
  const { firstName, lastName } = employee;

  const roundId = await findLastRoundId();

  const totalSoldBagsByKg = await findTotalBagsByKg(args.bagSize, 'sold');
  const totalAddedBagsByKg = await findTotalBagsByKg(args.bagSize, 'added');
  const totalAddedBags = await findTotalBags('added');
  const totalSoldBags = await findTotalBags('sold');

  const remainingTotalBags = totalAddedBags - totalSoldBags;

  const remainingBags = totalAddedBagsByKg - totalSoldBagsByKg;

  if (remainingBags < args.soldQuantity) {
    throw new Error(`Hasigaye imifuka ${remainingBags} yonyine`);
  }

  const productInfo = {
    productName: args.productName,
    bagSize: args.bagSize,
    oneBagCost: args.oneBagCost,
    addedQuantity: args.soldQuantity,
    currentQuantity: remainingBags - args.soldQuantity,
    roundId,
    userId: employee.id,
    transactionType: 'sold',
    totalBags: remainingTotalBags - args.soldQuantity,
    totalCost: args.oneBagCost * args.soldQuantity
  };

  const registeredProduct = await products.create(productInfo);
  const {
    bagSize, oneBagCost,
    addedQuantity,
    currentQuantity,
    totalBags,
    totalCost
  } = registeredProduct;

  const registeredProductInfo = {
    ...registeredProduct.dataValues,
    employee: `${firstName} ${lastName}`,
    totalBags: `${totalBags} bags`,
    totalCost: `${totalCost} Rwf`,
    bagSize: `${bagSize}kg`,
    oneBagCost: `${oneBagCost} Rwf`,
    quantity: `${addedQuantity} bags`,
    currentQuantity: `${currentQuantity} bags`
  };

  return registeredProductInfo;
};

const getAllRoundsResolver = async (req) => {
  handleErrors(req.isAuth, errorName.UNAUTHORIZED);

  const allRounds = await rounds.findAll();
  const returnedData = [];
  allRounds.forEach((element) => {
    const { createdAt } = element.dataValues;
    const round = { ...element.dataValues, createdAt: moment(createdAt).format('MMMM Do YYYY, h:mm:ss a') };

    returnedData.push(round);
  });

  return returnedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
};

export {
  registerRoundResolver,
  addProductResolver,
  sellProductResolver,
  getAllRoundsResolver
};
