"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("benefits_points", [
      { id: 1, content: "Global Exposure", title_id: 1 },
      { id: 2, content: "Co-Branding Opportunities", title_id: 1 },
      { id: 3, content: "Interactive Features", title_id: 2 },
      { id: 4, content: "Personalized Content", title_id: 2 },
      { id: 5, content: "Real-Time Analytics", title_id: 3 },
      { id: 6, content: "Performance Tracking", title_id: 3 },
      { id: 7, content: "Flexible Architecture", title_id: 4 },
      { id: 8, content: "Adaptable for Growth", title_id: 4 },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("benefits_points", null, {});
  },
};
