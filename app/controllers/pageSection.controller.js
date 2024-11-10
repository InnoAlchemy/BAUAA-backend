const db = require("../models");
const path = require("path");

const lala = db.pageSection;
const Op = db.Sequelize.Op;
const upload = require("./../middlewares/multer.js"); // Import the multer config

exports.update = (req, res) => {
  const { page_name } = req.params;
  const sections = req.body.sections;
  console.log(req.body.sections);
  console.log("--------------------");

  // Validate inputs
  if (!page_name || !sections || !Array.isArray(sections)) {
    return res.status(400).send({
      message: "Page name and a valid sections array are required.",
    });
  }

  // Map each section to an update promise
  const updatePromises = sections.map((sectionData) => {
    const parsedSection =
      typeof sectionData === "string" ? JSON.parse(sectionData) : sectionData;
    const { section_name, title, description } = parsedSection;

    // Prepare the data to update
    const updateData = {
      title: title,
      description: description,
    };

    // Conditionally add image_url if a file is uploaded for the section
    const file = req.files.find((file) => file.fieldname === section_name);
    if (file) {
      updateData.image_url = `/uploads/${file.filename}`;
    }

    // Update the database for the specified page and section name
    return lala.update(updateData, {
      where: { page_name: page_name, section_name: section_name },
    });
  });

  // Execute all update promises
  Promise.all(updatePromises)
    .then((results) => {
      const updatedSections = results.filter(
        (result) => result[0] === 1
      ).length;
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

  // Validate input
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
