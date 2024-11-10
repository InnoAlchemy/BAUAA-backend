"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert bulk data into page_sections table with createdAt and updatedAt
    await queryInterface.bulkInsert("page_sections", [
      {
        id: 1,
        page_name: "home",
        section_name: "homeHeader",
        title: "Lorem Ipsum Dolor Sit Amet",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
        image_url: "/uploads/homeHeader.png",
      },
      {
        id: 2,
        page_name: "home",
        section_name: "whyBAUAA",
        title: "Why BAUAA",
        description:
          "At BAUAA, we are passionate about revolutionizing the way you stay connected while traveling. Founded with a vision to eliminate the hassles of traditional SIM cards and exorbitant roaming charges, Flyesim offers a seamless, innovative, and cost-effective",
        image_url: null,
      },
      {
        id: 3,
        page_name: "home",
        section_name: "whoWeAre",
        title: "Who We Are",
        description:
          "Flyesim is a cutting-edge technology company dedicated to enhancing your travel experience through our state-of-the-art eSIM application. Our team consists of tech enthusiasts, travel aficionados, and customer service experts, all committed to providing y",
        image_url: "/uploads/whoWeAre.png",
      },
      {
        id: 4,
        page_name: "home",
        section_name: "homeBanner",
        title: "EXPLORE ALUMNI BENEFITS",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra nunc ante velit vitae. Est tellus vitae, nullam lobortis enim. Faucibus amet etiam tincidunt rhoncus, ullamcorper velit. Ullamcorper risus tempor, ac nunc libero urna, feugiat.",
        image_url: "/uploads/homeBanner.png",
      },
      {
        id: 5,
        page_name: "about",
        section_name: "aboutHeader",
        title: "About Header",
        description: "About Header Discription",
        image_url: "/uploads/aboutHeader.png",
      },
      {
        id: 6,
        page_name: "about",
        section_name: "whyBAUAA",
        title: "Why BAUAA",
        description:
          "At BAUAA, we are passionate about revolutionizing the way you stay connected while traveling. Founded with a vision to eliminate the hassles of traditional SIM cards and exorbitant roaming charges, Flyesim offers a seamless, innovative, and cost-effective",
        image_url: null,
      },
      {
        id: 7,
        page_name: "about",
        section_name: "whoWeAre",
        title: "Who We Are",
        description:
          "Flyesim is a cutting-edge technology company dedicated to enhancing your travel experience through our state-of-the-art eSIM application. Our team consists of tech enthusiasts, travel aficionados, and customer service experts, all committed to providing y",
        image_url: "/uploads/whoWeAre.png",
      },
      {
        id: 8,
        page_name: "about",
        section_name: "aboutBanner",
        title: "Explore Alumni Benifits",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra nunc ante velit vitae. Est tellus vitae, nullam lobortis enim. Faucibus amet etiam tincidunt rhoncus, ullamcorper velit. Ullamcorper risus tempor, ac nunc libero urna, feugiat.",
        image_url: "/uploads/aboutBanner.png",
      },
      {
        id: 9,
        page_name: "getinvolved",
        section_name: "get_involved_header",
        title: "Lorem Ipsum Dolor Sit Amet",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
        image_url: "/uploads/get_involved_header.png",
      },
      {
        id: 10,
        page_name: "getinvolved",
        section_name: "Who_we_are",
        title: "Who We Are",
        description:
          "BAUAA is a cutting-edge technology company dedicated to enhancing your travel experience through our state-of-the-art eSIM application. Our team consists of tech enthusiasts, travel aficionados, and customer service experts, all committed to providing you",
        image_url: "/uploads/Who_we_are.png",
      },
      {
        id: 11,
        page_name: "getinvolved",
        section_name: "What_we_do",
        title: "What we Do",
        description:
          "At BAUAA, we are passionate about revolutionizing the way you stay connected while traveling. Founded with a vision to eliminate the hassles of traditional SIM cards and exorbitant roaming charges, Flyesim offers a seamless, innovative, and cost-effective",
        image_url: "/uploads/What_we_do.png",
      },
      {
        id: 12,
        page_name: "getinvolved",
        section_name: "Join_Us_Today",
        title: "Join Us Today",
        description:
          "Join us DescriptionIf you’re interested in exploring partnership opportunities with BAUAA, we’d love to hear from you. Fill out the form below, and our partnership team will get in touch with you to discuss how we can work together to achieve mutual succe",
        image_url: "/uploads/Join_Us_Today.png",
      },
      {
        id: 13,
        page_name: "getinvolved",
        section_name: "get_involved_banner",
        title: "Donate for BAUAA",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra nunc ante velit vitae. Est tellus vitae, nullam lobortis enim. Faucibus amet etiam tincidunt rhoncus, ullamcorper velit. Ullamcorper risus tempor, ac nunc libero urna, feugiat.",
        image_url: "/uploads/get_involved_banner.png",
      },
      {
        id: 14,
        page_name: "about",
        section_name: "whatyouget",
        title: "What You Get",
        description:
          "Partnering with BAUAA comes with a multitude of benefits designed to enhance your business and provide exceptional value to your customers.",
        image_url: null,
      },
      {
        id: 15,
        page_name: "contactUs",
        section_name: "phoneNumber",
        title: "+961 76 722 925",
        description: null,
        image_url: null,
      },
      {
        id: 16,
        page_name: "contactUs",
        section_name: "emailAddress",
        title: "Info@BAU.com",
        description: null,
        image_url: null,
      },
      {
        id: 17,
        page_name: "contactUs",
        section_name: "location",
        title: "Beirut, Lebanon",
        description: null,
        image_url: null,
      },
      {
        id: 18,
        page_name: "contactUs",
        section_name: "socialMedia",
        title: "Whatsapp",
        description: "url",
        image_url: null,
      },
      {
        id: 19,
        page_name: "contactUs",
        section_name: "socialMedia",
        title: "Facebook",
        description: "url",
        image_url: null,
      },
      {
        id: 20,
        page_name: "contactUs",
        section_name: "socialMedia",
        title: "Whatsapp",
        description: "url",
        image_url: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Revert the seed by deleting the data from page_sections table
    await queryInterface.bulkDelete("page_sections", null, {});
  },
};
