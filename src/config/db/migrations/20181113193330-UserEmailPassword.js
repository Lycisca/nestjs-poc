'use strict';

// import { QueryInterface, SequelizeStatic } from 'sequelize';
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('User', 'email', Sequelize.STRING);
    queryInterface.addColumn('User', 'password', Sequelize.STRING);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('User', 'email');
    queryInterface.removeColumn('User', 'password');
  },
};
