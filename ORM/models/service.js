'use strict';
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});

  Service.associate = (models) => {
    Service.belongsTo(models.Group, {
      foreignKey: 'groupId',
      onDelete: 'CASCADE'
    });
  };

  return Service;
};