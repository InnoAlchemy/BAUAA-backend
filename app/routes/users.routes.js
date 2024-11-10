const express = require("express");
const router = express.Router(); // Initialize the router
const userController = require("../controllers/users.controller.js"); // Import the controller

// Create a new User
router.post("/users", userController.create);

// Retrieve all Users
router.get("/users", userController.findAll);

// Retrieve a single User by ID
router.get("/users/:id", userController.findOne);

// Update a User by ID
router.post("/users/:id", userController.update);

// Delete a User by ID
router.delete("/users/:id", userController.delete);

module.exports = (app) => {
  app.use("/api", router); // Mount the router on the /api path
};
