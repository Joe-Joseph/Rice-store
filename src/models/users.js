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

  users.associate = (models) => {
    // associations can be defined here
    models.users.hasMany(models.products, {
      foreignKey: 'userId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return users;
};
