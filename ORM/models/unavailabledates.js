'use strict';
module.exports = (sequelize, DataTypes) => {
  const UnavailableDates = sequelize.define('UnavailableDates', {
    date: DataTypes.DATEONLY
  }, {});
  UnavailableDates.associate = function(models) {
    // associations can be defined here
  };
  return UnavailableDates;
};