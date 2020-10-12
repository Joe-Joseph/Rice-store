import moment from 'moment';
import model from '../models';

const { products } = model;
const transactionsArray = [];

const getAllTransactions = (allTransactions) => {
  // eslint-disable-next-line no-unused-expressions
  (allTransactions.length > 0) && allTransactions.forEach(async (element) => {
    // console.log('All transactions', element.dataValues);
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
  });

  return transactionsArray;
};

export default getAllTransactions;
