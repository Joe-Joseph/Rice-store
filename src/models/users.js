module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    firstName: { allowNull: false, type: String },
    lastName: { allowNull: false, type: String },
    role: { allowNull: false, type: String },
    username: {
      allowNull: false,
      type: String,
      unique: true,
    },
    password: { allowNull: false, type: String },
  }, {});

  // eslint-disable-next-line no-unused-vars
  users.associate = (models) => {
    // associations can be defined here
    // models.users.hasOne(models.stores);
  };
  return users;
};
