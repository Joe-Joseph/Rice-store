import FormatError from 'easygraphql-format-error';

const formatError = new FormatError([
  {
    name: 'CONFLICT',
    message: 'Username already exists',
    statusCode: 409
  },
  {
    name: 'FORBIDDEN',
    message: 'Incorrect username or password',
    statusCode: 403
  },
  {
    name: 'NOT_FOUND',
    message: 'Not found',
    statusCode: 404
  },
  {
    name: 'UNAUTHORIZED',
    message: 'You are unauthorized, Please login',
    statusCode: 401
  },
  {
    name: 'BAD_REQUEST',
    message: 'Please fill all the required field correctly',
    statusCode: 400
  }
]);

export default formatError;
