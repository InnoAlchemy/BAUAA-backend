const express = require("express");
const cors = require("cors");
const multer = require("multer"); // Import multer

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = require("./app/models");
db.sequelize
  .sync
  // { force: false }).then(() => {
  // console.log("Drop and re-sync db.");
  // }
  ();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).send({ message: err.message });
  } else if (err) {
    return res.status(500).send({ message: "An error occurred." });
  }
  next();
});
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/pageSection.routes")(app);
require("./app/routes/benefit.routes")(app);
require("./app/routes/users.routes")(app);
require("./app/routes/boardmembers.routes")(app);
require("./app/routes/partners.routes")(app);
require("./app/routes/inbox.routes")(app);
require("./app/routes/events.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
