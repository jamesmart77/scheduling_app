'use strict';
module.exports = (sequelize, DataTypes) => {
  const Constraints = sequelize.define('Constraints', {
    volunteer_id: DataTypes.BIGINT,
    unavailable_date: DataTypes.DATE
  }, {});
  Constraints.associate = function(models) {
    // associations can be defined here
  };
  return Constraints;
};