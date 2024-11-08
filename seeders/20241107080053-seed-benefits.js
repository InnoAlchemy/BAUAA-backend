"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("benefits", [
      { id: 1, title: "Expanded Reach and Visibility" },
      { id: 2, title: "Enhanced User Engagement" },
      { id: 3, title: "Data-Driven Insights" },
      { id: 4, title: "Scalable Solutions" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("benefits", null, {});
  },
};
