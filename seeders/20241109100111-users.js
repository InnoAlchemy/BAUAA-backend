"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add seed data without createdAt and updatedAt
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "John Doe",
          address: "123 Main St",
          birthday: "1990-01-01",
          phone: "1234567890",
          event_status: "Joined",
        },
        {
          name: "Jane Smith",
          address: "456 Elm St",
          birthday: "1992-02-02",
          phone: "0987654321",
          event_status: "Pending",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Remove all entries from Users table
    await queryInterface.bulkDelete("users", null, {});
  },
};
