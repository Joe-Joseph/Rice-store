import model from '../models';
import formatError from '../helpers/errorMessages';
import findLastRoundId from '../helpers/lastAddedRoundIndex';
import { findTotalBagsByKg, findTotalBags } from '../helpers/totalBagsByKg';

const { errorName } = formatError;

const { rounds, products } = model;

const registerRoundResolver = async (args, req) => {
  if (!req.isAuth) {
    throw new Error(errorName.UNAUTHORIZED);
  }

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
  if (!req.isAuth) {
    throw new Error(errorName.UNAUTHORIZED);
  }

  const roundId = await findLastRoundId();

  const totalSoldBagsByKg = await findTotalBagsByKg(args.bagSize, 'sold');
  const totalAddedBagsByKg = await findTotalBagsByKg(args.bagSize, 'added');
  const totalAddedBags = await findTotalBags('added');
  const totalSoldBags = await findTotalBags('sold');

  const remainingTotalBags = totalAddedBags - totalSoldBags;

  const remainingBags = totalAddedBagsByKg - totalSoldBagsByKg;

  const employee = await req.user;
  const { firstName, lastName } = employee;

  const productInfo = {
    productName: args.productName,
    bagSize: args.bagSize,
    oneBagCost: 0,
    addedQuantity: args.addedQuantity,
    currentQuantity: remainingBags + args.addedQuantity,
    totalBags: remainingTotalBags + args.addedQuantity,
    roundId,
    transactionType: 'added',
    totalCost: 0
  };

  const registeredProduct = await products.create(productInfo);
  const {
    productName, bagSize, addedQuantity, currentQuantity, totalBags
  } = registeredProduct;

  const registeredProductInfo = {
    roundId,
    employee: `${firstName} ${lastName}`,
    productName,
    totalBags: `${totalBags} bags`,
    bagSize: `${bagSize} kg`,
    addedQuantity: `${addedQuantity} bags`,
    currentQuantity: `${currentQuantity} bags`
  };

  return registeredProductInfo;
};

const sellProductResolver = async (args, req) => {
  if (!req.isAuth) {
    throw new Error(errorName.UNAUTHORIZED);
  }

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
    transactionType: 'sold',
    totalBags: remainingTotalBags - args.soldQuantity,
    totalCost: args.oneBagCost * args.soldQuantity
  };

  const registeredProduct = await products.create(productInfo);
  const {
    productName,
    bagSize, oneBagCost,
    addedQuantity,
    currentQuantity,
    transactionType,
    totalBags,
    totalCost
  } = registeredProduct;

  const registeredProductInfo = {
    roundId,
    employee: `${firstName} ${lastName}`,
    productName,
    transactionType,
    totalBags: `${totalBags} bags`,
    totalCost: `${totalCost} Rwf`,
    bagSize: `${bagSize}kg`,
    oneBagCost: `${oneBagCost} Rwf`,
    soldQuantity: `${addedQuantity} bags`,
    currentQuantity: `${currentQuantity} bags`
  };

  return registeredProductInfo;
};

export { registerRoundResolver, addProductResolver, sellProductResolver };
