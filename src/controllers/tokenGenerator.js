import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = async (user) => {
  const data = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  };
  const token = await jwt.sign(data, process.env.SECRET_KEY);

  return token;
};

const decodeToken = async (token) => {
  const user = await jwt.decode(token, process.env.SECRET_KEY);

  return user;
};

export { generateToken, decodeToken };
