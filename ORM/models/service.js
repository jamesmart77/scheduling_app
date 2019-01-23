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

  Service.associate = (models) => {
    Service.belongsTo(models.Group, {
      foreignKey: 'groupId',
      onDelete: 'CASCADE'
    });
  };

  // many-to-many with join included
  Service.associate = (models) => {
    Service.belongsToMany(models.User, {
      through: 'users_services',
      as: 'serviceUsers',
      foreignKey: 'serviceId'
    });
  };

  return Service; 
};