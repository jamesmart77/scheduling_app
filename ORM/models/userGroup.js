'use strict';
module.exports = (sequelize, DataTypes) => {
  const userGroup = sequelize.define('userGroup', {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {});

  userGroup.associate = (models) => {
    // associations can be defined here
  };

  return userGroup;
};