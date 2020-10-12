import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import model from '../models';
import formatError from '../helpers/errorMessages';
import { generateToken } from './tokenGenerator';
import findOneUser from '../helpers/findOneUser';
import handleErrors from '../helpers/errorHandler';

dotenv.config();

const { users } = model;

const { errorName } = formatError;

const createUserFunction = async (args) => {
  const existingUser = await users.findOne({ where: { email: args.email } });
  if (existingUser) {
    throw new Error(errorName.CONFLICT);
  }
  const {
    firstName,
    lastName,
    email,
    password
  } = args;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = {
    firstName,
    lastName,
    email,
    role: 'user',
    password: hashedPassword
  };
  await users.create(user);
  const userData = {
    ...user,
    password: null
  };
  return userData;
};

const loginUserFunction = async (args) => {
  const registeredUser = await users.findOne({ where: { email: args.email } });
  handleErrors(registeredUser, errorName.FORBIDDEN);
  console.log('USERS HHH', registeredUser.dataValues);
  const {
    userId,
    firstName,
    lastName,
    role,
    password
  } = registeredUser.dataValues;
  const payload = {
    userId,
    firstName,
    lastName,
    role
  };
  const validPassword = await bcrypt.compare(args.password, password);
  handleErrors(validPassword, errorName.FORBIDDEN);

  const token = await generateToken(payload);
  return {
    message: 'Logged in successfully!!',
    email: registeredUser.email,
    firstName: registeredUser.firstName,
    token
  };
};

const resetPassword = async (args) => {
  const registeredUser = await findOneUser(args.email);

  handleErrors(registeredUser, errorName.NOT_FOUND);

  const token = await generateToken(registeredUser);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailMessage = {
    from: 'woriors73@gmail.com',
    to: `${registeredUser.email}`,
    subject: 'Rice store',
    text: `It works !!!!!!!! http://localhost:4000/${token}`
  };

  transporter.sendMail(mailMessage);

  return registeredUser;
};

export { createUserFunction, loginUserFunction, resetPassword };
