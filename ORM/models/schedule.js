'use strict';
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    date: DataTypes.DATEONLY
  }, {});
  Schedule.associate = function(models) {
    // associations can be defined here
  };
  return Schedule;
};