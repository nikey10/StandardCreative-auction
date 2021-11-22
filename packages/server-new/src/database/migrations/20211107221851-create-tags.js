'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tags', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tags');
  }
};
