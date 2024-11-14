const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller.js");

// Create a new User
router.post("/users", userController.create);

// Retrieve all Users
router.get("/users", userController.findAll);

// Retrieve a single User by ID
router.get("/users/:id", userController.findOne);

// Delete a User by ID
router.delete("/users/:id", userController.delete);

// Register: Step 1 - Send OTP
router.post("/register", userController.register);

// Complete Registration after OTP verification
router.post(
  "/verify-otp-and-complete-registration",
  userController.verifyOtpAndCompleteRegistration
);

// Login: Request OTP
router.post("/login-request-otp", userController.loginRequestOtp);

// Verify OTP and login
router.post("/verify-otp-login", userController.verifyOtpAndLogin);

module.exports = (app) => {
  app.use("/api", router); // Mount the router on the /api path
};
