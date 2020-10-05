module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('products', {
    transactionId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    productName: { type: Sequelize.STRING },
    productType: { type: Sequelize.STRING },
    bagSize: { type: Sequelize.INTEGER },
    oneBagCost: { type: Sequelize.INTEGER },
    addedQuantity: { type: Sequelize.INTEGER },
    currentQuantity: { type: Sequelize.INTEGER },
    totalBags: { type: Sequelize.INTEGER },
    roundId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'rounds',
        key: 'roundId'
      }
    },
    transactionType: { type: Sequelize.STRING },
    totalCost: { type: Sequelize.INTEGER },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('products')
};
