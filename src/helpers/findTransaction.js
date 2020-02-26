import model from '../models';

const { products } = model;

const findOneTransaction = async (transactionId) => {
  const transaction = await products.findOne({ where: { transactionId } });

  return transaction;
};

export default findOneTransaction;
