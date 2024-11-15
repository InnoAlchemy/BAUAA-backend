const db = require("../models");
const User = db.users;
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = "your_secret_key";

// Store OTPs temporarily (for testing purposes)
let otpStore = {};

// Mock function to send OTP
function sendOtp(email, otp) {
  console.log(`OTP for ${email}: ${otp}`); // Replace with actual service in production
}

// Generate OTP with only digits
function generateOtp(length) {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10); // Random digit from 0-9
  }
  return otp;
}

// Create and Save a new User
exports.create = (req, res) => {
  const { name, address, birthday, phone, event_status } = req.body;

  if (!name || !address || !birthday || !phone || !event_status) {
    return res.status(400).send({ message: "All fields are required." });
  }

  const user = { name, address, birthday, phone, event_status };

  User.create(user)
    .then((data) => res.send({ message: "User created successfully", data }))
    .catch((err) => res.status(500).send({ message: `Error: ${err.message}` }));
};

// Retrieve all Users
exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => res.send({ message: "Users retrieved successfully", data }))
    .catch((err) => res.status(500).send({ message: `Error: ${err.message}` }));
};

// Find a single User by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send({ message: "User retrieved successfully", data });
      } else {
        res.status(404).send({ message: `User not found with id=${id}` });
      }
    })
    .catch((err) => res.status(500).send({ message: `Error: ${err.message}` }));
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ message: "All fields are required." });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser && existingUser.isVerified) {
      return res.status(400).send({ message: "Email already in use." });
    } else if (existingUser && !existingUser.isVerified) {
      // Resend OTP for unverified user
      existingUser.otp = generateOtp();
      existingUser.otpExpiry = new Date().getTime() + 5 * 60 * 1000;
      await existingUser.save();
      sendOtp(email, existingUser.otp);
      return res.status(200).send({ message: "OTP sent for verification." });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      isVerified: false,
    });

    // Generate OTP and save it
    const otp = generateOtp(6);
    console.log(otp);
    newUser.otp = otp;
    newUser.otpExpiry = new Date().getTime() + 5 * 60 * 1000;
    await newUser.save();

    sendOtp(email, otp); // Mock OTP sending (replace with actual OTP sending)

    res.status(200).send({
      message: "User registered successfully. OTP sent for verification.",
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: `Error registering user: ${error.message}` });
  }
};

// Complete Registration (Step 2: Verify OTP and create user)
exports.verifyOtpAndCompleteRegistration = async (req, res) => {
  const { email, otp } = req.body;
  console.log(req.body);

  if (!email || !otp) {
    return res.status(400).send({ message: "Email and OTP are required." });
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    console.log(user.otp);
    console.log("--------");
    console.log(otp);

    // Check if OTP matches and is within the expiry time
    if (user.otp !== otp || user.otpExpiry < new Date().getTime()) {
      return res.status(401).send({ message: "Invalid or expired OTP." });
    }

    // Mark user as verified and clear OTP data
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(201).send({ message: "User verified successfully." });
  } catch (error) {
    res
      .status(500)
      .send({ message: `Error completing registration: ${error.message}` });
  }
};

exports.loginRequestOtp = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Email and password are required." });
  }

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found." });
    }

    console.log(user.isVerified);

    if (user.isVerified === true) {
      console.log("True");

      const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET_KEY,
        { expiresIn: "5m" } // Access token expires in 5 minutes
      );
      return res.status(200).json({
        success: true,
        message: "User is verified. You are logged in.",
        accessToken,
        role: user.role,
      });
    }

    // If not verified, request OTP for verification
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password." });
    }

    // Generate OTP for verification
    const otp = generateOtp(6); // Generate OTP of 6 digits

    // Store OTP and its expiry time in the database
    user.otp = otp;
    user.otpExpiry = new Date().getTime() + 5 * 60 * 1000; // OTP is valid for 5 minutes
    await user.save();

    // Send OTP via email (you would use an actual email service here)
    // sendOtpEmail(user.email, otp);

    // Send response to prompt user to verify OTP
    res.json({
      success: false,
      message: "OTP sent to your email for verification.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error requesting OTP." });
  }
};

// Endpoint to verify OTP and login
exports.verifyOtpAndLogin = async (req, res) => {
  const { email, otp } = req.body;
  console.log(req.body);

  if (!email || !otp) {
    return res.status(400).send({ message: "Email and OTP are required." });
  }

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found." });
    }

    // Check if OTP is valid and hasn't expired
    if (user.otp !== otp || new Date().getTime() > user.otpExpiry) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP." });
    }

    // Mark user as verified
    user.isVerified = 1; // Set to 1 (verified)
    user.otp = null; // Clear OTP after successful verification
    user.otpExpiry = null; // Clear OTP expiry
    await user.save();

    // Generate an access token for the user that expires in 5 minutes
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET_KEY,
      { expiresIn: "5m" } // Access token expires in 5 minutes
    );

    res.json({
      success: true,
      message: "Verification successful. You are now logged in.",
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error verifying OTP." });
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: `User with id=${id} deleted successfully.` });
      } else {
        res.send({ message: `User not found with id=${id}.` });
      }
    })
    .catch((err) => res.status(500).send({ message: `Error: ${err.message}` }));
};
