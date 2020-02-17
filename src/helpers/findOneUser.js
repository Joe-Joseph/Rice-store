import model from '../models';

const { users } = model;

const findOneUser = async (userEmail) => {
  console.log('function fired');
  const user = await users.findOne({ where: { email: userEmail } });

  return user;
};

export default findOneUser;
