import * as yup from 'yup';

const roundValidation = yup.object().shape({
  carPlate: yup.string().trim().min(5).max(255),
  driverName: yup.string().trim().min(3).max(255),
});

const productValidation = yup.object().shape({
  productName: yup.string().trim().min(3).max(255),
  bagSize: yup.number(),
  oneBagCost: yup.number(),
  quantity: yup.number(),
});

const storeValidation = yup.object().shape({
  storeLocation: yup.string().trim().min(3).max(255),
});

export { roundValidation, productValidation, storeValidation };
