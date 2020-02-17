import FormatError from 'easygraphql-format-error';

const formatError = new FormatError([
  {
    name: 'INVALID_EMAIL',
    message: 'Email is not valid',
    statusCode: 400
  },
  {
    name: 'CONFLICT',
    message: 'Email already exists',
    statusCode: 409
  },
  {
    name: 'FORBIDDEN',
    message: 'Invalid email or password',
    statusCode: 403
  },
  {
    name: 'NOT_FOUND',
    message: 'Not found',
    statusCode: 404
  }
]);

export default formatError;
