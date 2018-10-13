'use strict';
module.exports = (sequelize, DataTypes) => {
  const Volunteer = sequelize.define('Volunteer', {
    volunteerName: DataTypes.STRING,
    group_id: DataTypes.BIGINT
  }, {});
  Volunteer.associate = function(models) {
    // associations can be defined here
  };
  return Volunteer;
};