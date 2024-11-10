const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  const { name, address, birthday, phone, event_status } = req.body;

  // Validate request
  if (!name || !address || !birthday || !phone || !event_status) {
    return res.status(400).send({
      message:
        "All fields (name, address, birthday, phone, event_status) are required.",
    });
  }

  // Create a User
  const user = { name, address, birthday, phone, event_status };

  // Save User in the database
  User.create(user)
    .then((data) => res.send({ message: "User created successfully", data }))
    .catch((err) => {
      res.status(500).send({
        message: `Error creating User: ${err.message}`,
      });
    });
};

// Retrieve all Users
exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => res.send({ message: "Users retrieved successfully", data }))
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Users: ${err.message}`,
      });
    });
};

// Find a single User by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send({ message: "User retrieved successfully", data });
      } else {
        res.status(404).send({
          message: `User with id=${id} not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving User with id=${id}: ${err.message}`,
      });
    });
};

// Update a User by ID
exports.update = (req, res) => {
  const id = req.params.id;
  const { name, address, birthday, phone, event_status } = req.body;

  // Validate request
  if (!name || !address || !birthday || !phone || !event_status) {
    return res.status(400).send({
      message:
        "All fields (name, address, birthday, phone, event_status) are required.",
    });
  }

  User.update(
    { name, address, birthday, phone, event_status },
    { where: { id } }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `User with id=${id} updated successfully.`,
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. User was not found or req.body is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating User with id=${id}: ${err.message}`,
      });
    });
};

// Delete a User by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `User with id=${id} was deleted successfully.`,
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. User was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete User with id=${id}: ${err.message}`,
      });
    });
};
