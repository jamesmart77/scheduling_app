'use strict';
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {});

  Schedule.associate = (models) => {
    Schedule.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  Schedule.associate = (models) => {
    Schedule.belongsTo(models.Service, {
      foreignKey: 'serviceId',
      onDelete: 'CASCADE',
    });
  };

  return Schedule;
};