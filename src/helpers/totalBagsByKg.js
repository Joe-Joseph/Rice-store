import model from '../models';

const { products } = model;

const findTotalBagsByKg = async (bagSize, transactionType) => {
  const productByBagSize = await products.findAll({ where: { bagSize, transactionType } });
  let totalBagsByKg = 0;
  productByBagSize.forEach((element) => {
    totalBagsByKg += element.addedQuantity;
  });

  return totalBagsByKg;
};

const findTotalBags = async (transactionType) => {
  const productByBagSize = await products.findAll({ where: { transactionType } });
  let totalBags = 0;
  productByBagSize.forEach((element) => {
    totalBags += element.addedQuantity;
  });

  return totalBags;
};

export { findTotalBagsByKg, findTotalBags };
