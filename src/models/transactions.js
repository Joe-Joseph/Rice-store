module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('transactions', {
    transactionId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      required: true,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    oneBagCost: { allowNull: false, type: DataTypes.INTEGER },
    quantity: { allowNull: false, type: DataTypes.INTEGER },
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'products',
        key: 'productId'
      }
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    transactionType: { allowNull: false, type: String },
    totalCost: { allowNull: false, type: DataTypes.INTEGER }
  }, {});

  // eslint-disable-next-line no-unused-vars
  products.associate = (models) => {
    // associations can be defined here
    // models.transactions.belongsTo(models.products, {
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  };
  return products;
};
