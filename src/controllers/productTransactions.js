import moment from 'moment';
import model from '../models';
import formatError from '../helpers/errorMessages';
import findLastRoundId from '../helpers/lastAddedRoundIndex';

const { errorName } = formatError;

const { products } = model;

const getTransctionsByRoundResolver = async (args, req) => {
  if (!req.isAuth) {
    throw new Error(errorName.UNAUTHORIZED);
  }

  const lastRoundId = await findLastRoundId();
  if (!lastRoundId) {
    throw new Error('Round does not exist yet.');
  }

  const transactions = await products.findAll({ where: { roundId: lastRoundId } });

  const allTransactions = [];

  transactions.forEach((element) => {
    const { dataValues } = element;
    const data = {
      ...dataValues,
      createdAt: moment(dataValues.createdAt).format('MMMM Do YYYY, h:mm:ss a')
    };

    allTransactions.push(data);
  });

  return allTransactions;
};

const getOneTransactionResolver = async (args, req) => {
  if (!req.isAuth) {
    throw new Error(errorName.UNAUTHORIZED);
  }

  const transaction = await products.findOne({ where: { transactionId: args.transactionId } });

  if (!transaction) {
    throw new Error('Transaction not found');
  }

  const newTransaction = {
    ...transaction.dataValues,
    createdAt: moment(transaction.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
  };

  return newTransaction;
};

export { getTransctionsByRoundResolver, getOneTransactionResolver };
