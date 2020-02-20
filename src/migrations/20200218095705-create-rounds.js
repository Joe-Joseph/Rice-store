module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('rounds', {
    roundId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    driverName: {
      type: Sequelize.STRING
    },
    carPlate: {
      type: Sequelize.STRING
    },
    employeId: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('rounds')
};
