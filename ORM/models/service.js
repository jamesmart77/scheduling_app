'use strict';
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    title: DataTypes.STRING
  }, {});
  Service.associate = function(models) {
    // associations can be defined here
  };
  return Service;
};