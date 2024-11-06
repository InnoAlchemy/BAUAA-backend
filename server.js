const express = require("express");
const cors = require("cors");
const multer = require("multer"); // Import multer

const app = express();

// CORS configuration
var corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

// Setup Multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the folder where the files will be stored
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Specify the file name (you can modify this logic)
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Handle Multer errors more explicitly
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    return res.status(500).send({ message: err.message });
  } else if (err) {
    // General errors
    return res.status(500).send({ message: "An error occurred." });
  }
  next();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/pageSection.routes")(app);

require("./app/routes/benefit.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
