import moment from 'moment';
import model from '../models';
import formatError from '../helpers/errorMessages';
import handleErrors from '../helpers/errorHandler';

const { errorName } = formatError;

const { rounds } = model;

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
  getAllRoundsResolver
};
