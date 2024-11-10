"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "boardmembers",
      [
        {
          name: "Alice Johnson",
          email: "alice.johnson@example.com",
          position: "CEO",
          image: "/uploads/board-member.png",
        },
        {
          name: "Bob Smith",
          email: "bob.smith@example.com",
          position: "CTO",
          image: "/uploads/board-member.png",
        },
        {
          name: "Charlie Lee",
          email: "charlie.lee@example.com",
          position: "CFO",
          image: "/uploads/board-member.png",
        },
        {
          name: "Diana Rose",
          email: "diana.rose@example.com",
          position: "COO",
          image: "/uploads/board-member.png",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("boardmembers", null, {});
  },
};
