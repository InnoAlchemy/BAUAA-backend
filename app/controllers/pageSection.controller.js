const { log } = require("console");
const db = require("../models");
const path = require("path");

const lala = db.pageSection;
const Op = db.Sequelize.Op;
const upload = require("./../middlewares/multer.js"); // Import the multer config

exports.update = (req, res) => {
  const { page_name } = req.params;
  const sections = req.body.sections;

  // console.log(req.params);
  // console.log("---------------");
  // console.log(req.body);

  // Check if the page_name and sections are provided
  if (!page_name || !sections || !Array.isArray(sections)) {
    return res.status(400).send({
      message: "Page name and a valid sections array are required.",
    });
  }

  const updatePromises = sections.map((sectionData, index) => {
    const parsedSection =
      typeof sectionData === "string" ? JSON.parse(sectionData) : sectionData;
    const { section_name, title, description } = parsedSection;

    // Prepare the data to update
    const updateData = {
      title: title,
      description: description,
      image_url: req.files.find((file) => file.fieldname == section_name)
        ? `/uploads/${
            req.files.find((file) => file.fieldname == section_name).filename
          }`
        : null,
    };
    // console.log(updateData);

    return lala.update(updateData, {
      where: { page_name: page_name, section_name: section_name },
    });
  });

  // Execute all update promises
  Promise.all(updatePromises)
    .then((results) => {
      const updatedSections = results.filter((num) => num[0] === 1).length;
      if (updatedSections > 0) {
        res.send({
          message: `${updatedSections} section(s) updated successfully for page_name=${page_name}.`,
        });
      } else {
        res.send({
          message: `No sections updated for page_name=${page_name}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating page sections: ${err.message}`,
      });
    });
};

exports.getAll = (req, res) => {
  const { page_name } = req.params;

  // Check if the page_name is provided
  if (!page_name) {
    return res.status(400).send({
      message: "Page name is required.",
    });
  }

  // Retrieve all sections for the given page_name
  lala
    .findAll({
      where: { page_name: page_name },
    })
    .then((sections) => {
      if (sections.length > 0) {
        res.send({
          message: "Sections retrieved successfully.",
          data: sections,
        });
      } else {
        res.send({
          message: `No sections found for page_name=${page_name}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving page sections: ${err.message}`,
      });
    });
};
