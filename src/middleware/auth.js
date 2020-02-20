import { decodeToken } from '../controllers/tokenGenerator';

// eslint-disable-next-line consistent-return
const authenticateUser = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  const token = authHeader && authHeader.split(' ')[1];

  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }

  let decodedToken;
  try {
    req.isAuth = true;
    decodedToken = decodeToken(token);
  } catch (error) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.user = await decodedToken;
  next();
};

export default authenticateUser;
