import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.SECRET_KEY);

  return token;
};


const decodeToken = async (token) => {
  const user = jwt.decode(token, process.env.SECRET_KEY);

  return user;
};

export { generateToken, decodeToken };
