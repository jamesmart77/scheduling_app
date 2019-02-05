'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invite = sequelize.define('Invite', {
    status: {
     type: DataTypes.STRING,
     allowNull: false,
     defaulValue: "Pending"
    },
    inviterId: {
     type: DataTypes.INTEGER,
     allowNull: false
    },
    inviteeId: {
     type: DataTypes.INTEGER,
     allowNull: false
    },
    groupId: {
     type: DataTypes.INTEGER,
     allowNull: false
    }
  }, {});

  Invite.associate = (models) => {
    Invite.belongsTo(models.User, {
      foreignKey: 'inviterId'
    });
  };

  Invite.associate = (models) => {
    Invite.belongsTo(models.User, {
      foreignKey: 'inviteeId'
    });
  };

  Invite.associate = (models) => {
    Invite.belongsTo(models.Group, {
      foreignKey: 'groupId'
    });
  };
  
  return Invite;
};