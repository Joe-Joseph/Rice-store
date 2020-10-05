module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    transactionId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      required: true,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    productName: { allowNull: false, type: String },
    productType: { allowNull: false, type: String },
    bagSize: { allowNull: false, type: String },
    oneBagCost: { allowNull: false, type: DataTypes.INTEGER },
    addedQuantity: { allowNull: false, type: DataTypes.INTEGER },
    currentQuantity: { allowNull: false, type: DataTypes.INTEGER },
    totalBags: { allowNull: false, type: DataTypes.INTEGER },
    roundId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'rounds',
        key: 'roundId'
      }
    },
    transactionType: { allowNull: false, type: String },
    totalCost: { allowNull: false, type: DataTypes.INTEGER }
  }, {});

  products.associate = (models) => {
    // associations can be defined here
    models.products.belongsTo(models.rounds, {
      foreignKey: 'roundId',
      targetKey: 'roundId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return products;
};
