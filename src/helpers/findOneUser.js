import model from '../models';

const { users } = model;

const findOneUser = async (condition) => {
  const user = await users.findOne(condition);

  return user;
};

export default findOneUser;
