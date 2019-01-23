'use strict';
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {});

  User.beforeCreate((user, options) => {
    return bcrypt
      .hash(user.password, 10)
      .then(hash => {
        user.password = hash;
      })
      .catch(err => {
        throw new Error();
      });
  });

  // many-to-many with join included
  User.associate = (models) => {
    User.belongsToMany(models.Group, {
      through: 'GroupUsers',
      as: 'groups',
      foreignKey: 'userId'
    });
  };

  // many-to-many with join included
  User.associate = (models) => {
    User.belongsToMany(models.Service, {
      through: 'UserServices',
      as: 'services',
      foreignKey: 'userId'
    });
  };

  User.associate = (models) => {
    User.hasMany(models.UnavailableDates, {
      foreignKey: 'userId',
      as: 'unavailableDates',
    });
  };

  User.associate = (models) => {
    User.hasMany(models.Schedule, {
      foreignKey: 'userId',
      as: 'scheduledDates',
    });
  };

  return User;
};