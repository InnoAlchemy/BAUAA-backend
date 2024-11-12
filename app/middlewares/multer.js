const { log } = require("console");
const multer = require("multer");
const path = require("path");

// Helper function to sanitize API path for filenames
const sanitizePath = (apiPath) => {
  return apiPath.replace(/\//g, "_").replace(/[^a-zA-Z0-9_]/g, "");
};

// Set the storage configuration for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the directory where uploaded files will be stored
    cb(null, "uploads/"); // Make sure this directory exists
  },
  filename: (req, file, cb) => {
    // Get the API endpoint name from the request URL
    const apiPath = sanitizePath(req.originalUrl);

    // Use the API endpoint as a prefix in the file name, along with a timestamp
    cb(null, `${file.fieldname}${path.extname(file.originalname)}`);
  },
});

// Filter to allow only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/svg+xml",
  ];
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
  limits: { fileSize: 20 * 1024 * 1024 }, // Limit file size to 20MB
});

module.exports = upload;
