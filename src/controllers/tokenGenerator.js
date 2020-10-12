import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = async (user) => {
  const data = {
    id: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role
  };
  const token = await jwt.sign(data, process.env.SECRET_KEY);
  return token;
};

const decodeToken = async (token) => {
  const user = await jwt.verify(token, process.env.SECRET_KEY);
  return user;
};

export { generateToken, decodeToken };
