import * as yup from 'yup';

const userValidation = yup.object().shape({
  username: yup.string().min(3).max(255),
  password: yup.string().min(3).max(255),
  firstName: yup.string().min(3).trim().max(255),
  lastName: yup.string().min(3).trim().max(255),
});

export default userValidation;
