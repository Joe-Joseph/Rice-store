import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = async (user) => {
  const data = {
    id: user.id,
    email: user.email,
  };
  const token = await jwt.sign(data, process.env.SECRET_KEY);

  return token;
};

export default generateToken;
