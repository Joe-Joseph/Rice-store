import bcrypt from 'bcryptjs';
import model from '../models';
import formatError from '../helpers/errorMessages';
import { generateToken } from './tokenGenerator';

const { users } = model;

const { errorName } = formatError;

const createUserFunction = async (args) => {
  const existingUser = await users.findOne({ where: { email: args.email } });
  if (existingUser) {
    throw new Error(errorName.CONFLICT);
  }
  const hashedPassword = await bcrypt.hash(args.password, 12);
  const user = {
    firstName: args.firstName,
    lastName: args.lastName,
    email: args.email,
    password: hashedPassword
  };
  const createdUser = await users.create(user);
  const userData = {
    id: createdUser.id,
    firstName: createdUser.firstName,
    lastName: createdUser.lastName,
    email: createdUser.email,
    password: null
  };
  return userData;
};

const loginUserFunction = async (args) => {
  const registeredUser = await users.findOne({ where: { email: args.email } });
  if (!registeredUser) {
    throw new Error(errorName.FORBIDDEN);
  }
  const validPassword = await bcrypt.compare(args.password, registeredUser.password);
  if (!validPassword) {
    throw new Error(errorName.FORBIDDEN);
  }
  const payload = {
    id: registeredUser.id,
    email: registeredUser.email,
  };

  const token = await generateToken(payload);
  return { message: 'Logged in successfully!!', email: registeredUser.email, token };
};

export { createUserFunction, loginUserFunction };
