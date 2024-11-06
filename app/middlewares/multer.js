const multer = require("multer");
const path = require("path");

// Set the storage configuration for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the directory where uploaded files will be stored
    cb(null, "uploads/"); // Make sure you have this directory created in your project
  },
  filename: (req, file, cb) => {
    // Use the original file name and append the timestamp to avoid conflicts
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1600000000000.jpg
  },
});

// Filter to allow only image files (you can add more checks if needed)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Initialize multer with storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // Limit file size to 5MB
});

module.exports = upload;
