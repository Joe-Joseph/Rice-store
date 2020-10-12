module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      required: true,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    storeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'stores',
        key: 'storeId'
      }
    },
    userId: { allowNull: false, type: DataTypes.INTEGER },
    productName: { allowNull: false, type: String },
    productType: { allowNull: false, type: DataTypes.STRING },
    bagSize: { allowNull: false, type: String },
    quantity: { allowNull: false, type: DataTypes.INTEGER },
    totalBags: { allowNull: false, type: DataTypes.INTEGER },
  }, {});

  // eslint-disable-next-line no-unused-vars
  products.associate = (models) => {
    // associations can be defined here
    // models.products.belongsTo(models.stores, {
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });

    // models.products.hasMany(models.transactions, {
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // });
  };
  return products;
};
