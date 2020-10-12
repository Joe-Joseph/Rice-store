module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('stores', {
    storeId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'userId'
      }
    },
    storeLocation: { type: Sequelize.STRING },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('stores')
};
