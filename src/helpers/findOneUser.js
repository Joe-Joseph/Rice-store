import model from '../models';

const { users } = model;

const findOneUser = async (username) => {
  const user = await users.findOne({ where: { username } });

  return user;
};

export default findOneUser;
