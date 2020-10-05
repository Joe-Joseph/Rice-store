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
    email: {
      allowNull: false,
      type: String,
      lowercase: true,
      unique: true,
    },
    password: { allowNull: false, type: String },
  }, {});

  // users.associate = function (models) {
  //   // associations can be defined here
  // };
  return users;
};
