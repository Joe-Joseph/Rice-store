import * as yup from 'yup';

const roundValidation = yup.object().shape({
  carPlate: yup.string().trim().min(5).max(255),
  driverName: yup.string().trim().min(3).max(255),
});

const productValidation = yup.object().shape({
  productName: yup.string().trim().min(3).max(255),
  bagSize: yup.number().required(),
  oneBagCost: yup.number(),
  soldQuantity: yup.number(),
});

export { roundValidation, productValidation };
