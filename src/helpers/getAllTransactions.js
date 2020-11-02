import moment from 'moment';
import model from '../models';

const { products } = model;

const getAllTransactions = async (allTransactions) => {
  const transactionsArray = [];
  // eslint-disable-next-line no-unused-expressions
  if (allTransactions.length > 0) {
    await Promise.all(
      allTransactions.map(async (element) => {
        const { dataValues } = element;
        const product = await products.findByPk(dataValues.productId);
        const data = {
          ...dataValues,
          productName: product.productName,
          productType: product.productType,
          bagSize: product.bagSize,
          createdAt: moment(dataValues.createdAt).format('L')
        };
        if (transactionsArray.length === 0) {
          transactionsArray.push(data);
        }
        const transactionFound = transactionsArray.filter(
          (transa) => transa.transactionId === data.transactionId
        );

        if (transactionFound.length === 0) {
          transactionsArray.push(data);
        }
      })
    );
  }

  // console.log('TRANSACTIONS AFTER>>>>>', transactionsArray);
  return transactionsArray;
};

export default getAllTransactions;
