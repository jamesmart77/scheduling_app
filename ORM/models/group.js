'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  // many-to-many with join included
  // Group.associate = (models) => {
  //   Group.belongsToMany(models.User, {
  //     through: 'users_groups',
  //     as: 'groupUsers',
  //     foreignKey: 'groupId'
  //   });
  // }; 

  Group.associate = (models) => {
    Group.belongsTo(models.User, {
      foreignKey: 'ownerId',
      onDelete: 'CASCADE'
    });
  };

  // Group.associate = (models) => {
  //   Group.hasMany(models.Service, {
  //     foreignKey: 'groupId',
  //     as: 'groupServices',
  //   }); 
  // };

  // Group.associate = (models) => {
  //   Group.hasMany(models.Invite, {
  //     foreignKey: 'groupId'
  //   });
  // };

  // Group.associate = (models) => {
  //   Group.belongsToMany(models.User, {
  //     through: 'groups_admins',
  //     as: 'groupAdmins',
  //     foreignKey: 'groupId'
  //   });
  // };

  return Group; 
};