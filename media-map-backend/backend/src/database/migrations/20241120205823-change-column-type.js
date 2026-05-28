module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('markers', 'moderatorComment', {
      type: Sequelize.TEXT, // или Sequelize.STRING(500) для ограничения
      allowNull: true, // если поле может быть null
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('markers', 'moderatorComment', {
      type: Sequelize.STRING(255), // возвращаем в исходное состояние
      allowNull: true, // если это необходимо
    });
  },
};
