'use strict';
module.exports = (sequelize, DataTypes) => {
  const ServiceOption = sequelize.define('ServiceOption', {
    name: DataTypes.STRING
  }, {});
  ServiceOption.associate = function(models) {
    // associations can be defined here
  };
  return ServiceOption;
};