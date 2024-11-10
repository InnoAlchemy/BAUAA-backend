const db = require("../models");
const Partner = db.partners;

exports.create = (req, res) => {
  const { name, url_link } = req.body;

  console.log(req.body);
  console.log("-----------------------");

  // Validate input
  if (!name || !url_link) {
    return res.status(400).send({
      message: "Name and URL link are required.",
    });
  }

  // Check if partner already exists based on the URL link
  Partner.findOne({ where: { name: name } })
    .then((existingPartner) => {
      if (existingPartner) {
        return res
          .status(400)
          .send({ message: "Partner with this name link already exists." });
      }

      let imagePath = "";

      // Set imagePath if a file was uploaded
      if (req.files) {
        const file = req.files.find((file) => file.fieldname === name);
        console.log(file);
        imagePath = `/uploads/${file.filename}`;
        console.log("Image path:", imagePath);
      }

      Partner.create({
        name,
        image_url: imagePath,
        url_link,
      })
        .then((partner) => {
          res.status(201).send({
            message: "Partner created successfully.",
            data: partner,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: `Error creating partner: ${err.message}`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error checking partner URL link: ${err.message}`,
      });
    });
};

exports.findAll = (req, res) => {
  Partner.findAll()
    .then((partners) => {
      if (partners.length > 0) {
        res.status(200).send({
          message: "Partners retrieved successfully.",
          data: partners,
        });
      } else {
        res.status(404).send({
          message: "No partners found.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving partners: ${err.message}`,
      });
    });
};

exports.delete = (req, res) => {
  const { id } = req.params;

  Partner.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (result === 1) {
        res.send({
          message: "Partner deleted successfully.",
        });
      } else {
        res.status(404).send({
          message: `Partner not found with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error deleting partner: ${err.message}`,
      });
    });
};
