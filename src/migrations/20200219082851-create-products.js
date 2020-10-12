module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('products', {
    productId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    storeId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    productName: { type: Sequelize.STRING },
    productType: { type: Sequelize.STRING },
    bagSize: { type: Sequelize.INTEGER },
    quantity: { type: Sequelize.INTEGER },
    totalBags: { type: Sequelize.INTEGER },
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
