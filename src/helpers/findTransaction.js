import model from '../models';

const { transactions } = model;

const findOneTransaction = async (transactionId, userId) => {
  const transaction = await transactions.findOne({ where: { transactionId, userId } });

  return transaction;
};

export default findOneTransaction;
