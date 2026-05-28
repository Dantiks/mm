'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('markers', 'mediaLink', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('markers', 'image', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('markers', 'authorComment', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('markers', 'mediaLink', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('markers', 'image', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('markers', 'authorComment', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },
};
