const db = require("../models");
const BoardMember = db.boardmembers; // Access the BoardMember model
const Op = db.Sequelize.Op;
const upload = require("./../middlewares/multer.js"); // Import the multer config

// Create a new BoardMember
exports.create = (req, res) => {
  const { name, email, position } = req.body;

  console.log(req.body);
  console.log("-----------------------");

  if (!name || !email || !position) {
    return res
      .status(400)
      .send({ message: "Name, Email, and Position are required." });
  }

  BoardMember.findOne({ where: { email: email } })
    .then((existingMember) => {
      if (existingMember) {
        return res.status(400).send({ message: "Email already exists." });
      }

      // Initialize imagePath with null by default
      let imagePath = "";

      // Set imagePath if a file was uploaded
      if (req.files) {
        const file = req.files.find((file) => file.fieldname === name);
        console.log(file);
        imagePath = `/uploads/${file.filename}`;
        console.log("Image path:", imagePath);
      }

      // Create new member
      BoardMember.create({
        name,
        email,
        position,
        image: imagePath,
      })
        .then((member) => {
          res.send({
            message: "Board member created successfully.",
            data: member,
          });
        })
        .catch((err) => {
          res
            .status(500)
            .send({ message: `Error creating board member: ${err.message}` });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: `Error checking email: ${err.message}` });
    });
};

// Retrieve all BoardMembers
exports.findAll = (req, res) => {
  BoardMember.findAll()
    .then((members) => {
      if (members.length > 0) {
        res.send({
          message: "Board members retrieved successfully.",
          data: members,
        });
      } else {
        res.send({
          message: "No board members found.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving board members: ${err.message}`,
      });
    });
};

exports.delete = (req, res) => {
  const { id } = req.params;

  BoardMember.destroy({ where: { id } })
    .then((deletedCount) => {
      if (deletedCount > 0) {
        res.send({
          message: "Board member deleted successfully.",
        });
      } else {
        res.status(404).send({
          message: `Board member with ID ${id} not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error deleting board member: ${err.message}`,
      });
    });
};
