const { log } = require("console");
const db = require("../models");

const lala = db.pageSection;
const Op = db.Sequelize.Op;
const upload = require("./../middlewares/multer.js"); // Import the multer config

exports.update = (req, res) => {
  const { page_name } = req.params;
  const sections = req.body.sections;

  console.log(req.params);
  console.log(req.body);

  // Check if the page_name and sections are provided
  if (!page_name || !sections || !Array.isArray(sections)) {
    return res.status(400).send({
      message: "Page name and a valid sections array are required.",
    });
  }

  // Prepare an array of image URLs if files were uploaded
  let image_urls = [];
  if (req.files) {
    req.files.forEach((file) => {
      image_urls.push(`/uploads/${file.filename}`);
    });
  }

  // Loop through each section, parse it, and update it in the database
  const updatePromises = sections.map((sectionData, index) => {
    // Parse the sectionData if it is a JSON string
    const parsedSection =
      typeof sectionData === "string" ? JSON.parse(sectionData) : sectionData;
    const { section_name, title, description } = parsedSection;

    // Prepare the data to update
    const updateData = {
      title: title,
      description: description,
      image_url: image_urls.length > 0 ? image_urls[index] : null,
    };
    console.log(updateData);

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
