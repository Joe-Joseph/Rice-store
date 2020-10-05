import model from '../models';

const { products } = model;

const findTotalBagsByKg = async (bagSize, transactionType, productName) => {
  // eslint-disable-next-line max-len
  const productByBagSize = await products.findAll({ where: { bagSize, transactionType, productName } });
  let totalBagsByKg = 0;
  productByBagSize.forEach((element) => {
    totalBagsByKg += element.addedQuantity;
  });

  return totalBagsByKg;
};

const findTotalBags = async (transactionType, productType) => {
  const productByBagSize = await products.findAll({ where: { transactionType, productType } });
  let totalBags = 0;
  productByBagSize.forEach((element) => {
    totalBags += element.addedQuantity;
  });

  return totalBags;
};

export { findTotalBagsByKg, findTotalBags };
