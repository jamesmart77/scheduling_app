'use strict';
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    title: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});

  Service.associate = (models) => {
    Service.hasMany(models.Schedule, {
      foreignKey: 'serviceId'
    });
  };

  return Service;
};