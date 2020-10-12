module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('transactions', {
    transactionId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    oneBagCost: { type: Sequelize.INTEGER },
    quantity: { type: Sequelize.INTEGER },
    productId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'products',
        key: 'productId'
      }
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
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
  down: (queryInterface) => queryInterface.dropTable('transactions')
};
