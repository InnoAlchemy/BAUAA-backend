"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "partners",
      [
        {
          name: "Partner A",
          image_url: "/uploads/Partner D.png",
          url_link: "https://www.facebook.com/",
        },
        {
          name: "Partner C",
          image_url: "/uploads/Partner D.png",
          url_link: "https://www.facebook.com/",
        },
        {
          name: "Partner D",
          image_url: "/uploads/Partner D.png",
          url_link: "https://www.facebook.com/",
        },
        {
          name: "Partner B",
          image_url: "/uploads/Partner B.png",
          url_link: "https://www.facebook.com/",
        },
        {
          name: "Partner E",
          image_url: "/uploads/Partner E.png",
          url_link: "https://www.facebook.com/",
        },
        {
          name: "Partner F",
          image_url: "/uploads/Partner F.png",
          url_link: "https://www.facebook.com/",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("partners", null, {});
  },
};
