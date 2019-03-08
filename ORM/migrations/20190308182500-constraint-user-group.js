'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('userGroups', ['userId', 'groupId'], {
      type: 'unique',
      name: 'userGroup_unique_constraint'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('userGroups', 'userGroup_unique_constraint')
  }
};