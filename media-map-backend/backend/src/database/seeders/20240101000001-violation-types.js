'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('violation_types', [
      { violationType: 'Язык вражды', icon: 'hate.png', createdAt: new Date(), updatedAt: new Date() },
      { violationType: 'Дезинформация', icon: 'fake.png', createdAt: new Date(), updatedAt: new Date() },
      { violationType: 'Пропаганда', icon: 'propaganda.png', createdAt: new Date(), updatedAt: new Date() },
      { violationType: 'Другое', icon: 'other.png', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('violation_types', null, {});
  },
};
