module.exports = (sequelize, DataTypes) => {
  const stores = sequelize.define('stores', {
    storeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    storeLocation: { allowNull: false, type: String },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'userId'
      }
    },
  }, {});

  stores.associate = (models) => {
    // associations can be defined here
    // models.stores.belongsTo(models.users, {
    //   foreignKey: 'userId',
    //   targetKey: 'userId',
    //   onUpdate: 'CASCADE',
    // });

    models.stores.hasMany(models.products, {
      foreignKey: 'productId',
      targetKey: 'productId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return stores;
};
