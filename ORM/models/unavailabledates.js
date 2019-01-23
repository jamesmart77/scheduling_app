'use strict';
module.exports = (sequelize, DataTypes) => {
  const UnavailableDates = sequelize.define('UnavailableDates', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {});

  UnavailableDates.associate = (models) => {
    UnavailableDates.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  
  return UnavailableDates;
}; 