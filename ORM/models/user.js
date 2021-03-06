'use strict';
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
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
        console.error("Bcrypt error: ", err)
        throw new Error(err);
      });
  });

  // // many-to-many with join included
  // User.associate = (models) => {
  //   User.belongsToMany(models.Group, {
  //     through: 'users_groups',
  //     as: 'userGroups',
  //     foreignKey: 'userId'
  //   });
  // };

  // // many-to-many with join included
  // User.associate = (models) => {
  //   User.belongsToMany(models.Service, {
  //     through: 'users_services',
  //     as: 'userServices',
  //     foreignKey: 'userId'
  //   });
  // };

  // User.associate = (models) => {
  //   User.hasMany(models.UnavailableDates, {
  //     foreignKey: 'userId',
  //     as: 'unavailableDates',
  //   }); 
  // };

  User.associate = (models) => {
    User.hasMany(models.Group, {
      foreignKey: 'ownerId',
      as: 'ownedGroups',
    });
    
    User.belongsToMany(models.Group, {
      through: models.userGroup,
      as: 'memberOfGroup',
      foreignKey: 'userId'
    });
  };


  // User.associate = (models) => {
  //   User.hasMany(models.Schedule, {
  //     foreignKey: 'userId',
  //     as: 'scheduledDates',
  //   });
  // };

  // User.associate = (models) => {
  //   User.hasMany(models.Invite, {
  //     foreignKey: 'inviterId'
  //   });
  // };

  // User.associate = (models) => {
  //   User.hasMany(models.Invite, {
  //     foreignKey: 'inviteeId'
  //   });
  // };

  // // many-to-many with join included
  // User.associate = (models) => {
  //   User.belongsToMany(models.Group, {
  //     through: 'groups_admins',
  //     as: 'groupAdmins',
  //     foreignKey: 'userId'
  //   });
  // };

  return User;
};