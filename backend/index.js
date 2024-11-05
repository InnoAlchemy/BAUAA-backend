import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import multer from "multer";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MySQL connection configuration
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "bau_website_content",
};

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Helper function to get database connection
async function getConnection() {
  return mysql.createConnection(dbConfig);
}

// Route to update content for the 'home' page
app.post("/home", upload.single("image"), async (req, res) => {
  const { section_name, title, description } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const connection = await getConnection();
    const [result] = await connection.execute(
      "UPDATE page_sections SET title = ?, description = ?, image_url = ? WHERE page_name = ? AND section_name = ?",
      [title, description, image_url, "home", section_name]
    );
    await connection.end();

    if (result.affectedRows > 0) {
      res.json({
        message: "Home content updated successfully",
      });
    } else {
      res.status(404).json({ message: "Section not found for home page" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update home content" });
  }
});

// Route to update content for the 'about' page
app.post("/about", upload.single("image"), async (req, res) => {
  const { section_name, title, description } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const connection = await getConnection();
    const [result] = await connection.execute(
      "UPDATE page_sections SET title = ?, description = ?, image_url = ? WHERE page_name = ? AND section_name = ?",
      [title, description, image_url, "about", section_name]
    );
    await connection.end();

    if (result.affectedRows > 0) {
      res.json({
        message: "About content updated successfully",
      });
    } else {
      res.status(404).json({ message: "Section not found for about page" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update about content" });
  }
});

// Route to update content for the 'getinvolved' page
app.post("/getinvolved", upload.single("image"), async (req, res) => {
  const { section_name, title, description } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const connection = await getConnection();
    const [result] = await connection.execute(
      "UPDATE page_sections SET title = ?, description = ?, image_url = ? WHERE page_name = ? AND section_name = ?",
      [title, description, image_url, "getinvolved", section_name]
    );
    await connection.end();

    if (result.affectedRows > 0) {
      res.json({
        message: "Get Involved content updated successfully",
      });
    } else {
      res
        .status(404)
        .json({ message: "Section not found for get involved page" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update get involved content" });
  }
});

// Start the server
app.listen(5000, () => console.log("App is running on http://localhost:5000"));
