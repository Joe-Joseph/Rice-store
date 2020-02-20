module.exports = (sequelize, DataTypes) => {
  const rounds = sequelize.define('rounds', {
    roundId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    driverName: { allowNull: false, type: String },
    carPlate: { allowNull: false, type: String },
    employeId: { allowNull: false, type: DataTypes.INTEGER }
  }, {});

  rounds.associate = (models) => {
    // associations can be defined here
    models.rounds.hasMany(models.products, {
      foreignKey: 'roundId',
      targetKey: 'roundId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return rounds;
};
