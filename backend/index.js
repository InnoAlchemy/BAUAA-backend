import express from "express";
import cors from "cors";
import mysql from "mysql2/promise"; // Import mysql2 with promise support
import bcrypt from "bcrypt"; // For hashing passwords
import jwt from "jsonwebtoken"; // For generating authentication tokens

import multer from "multer";
import path from "path";

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to store uploaded images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Append original file extension
  },
});

// Multer middleware
const upload = multer({ storage: storage });

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use("/uploads", express.static("uploads"));

// MySQL connection configuration
// MySQL connection configuration
const dbConfig = {
  host: "localhost",
  user: "root", // Default MySQL username for XAMPP
  password: "", // Default password is empty for root
  database: "bau", // Your database name
};

app.get("/headers", async (req, res) => {
  const connection = await connectDb();
  try {
    const [rows] = await connection.query("SELECT * FROM headers");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching header data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await connection.end();
  }
});

app.get("/homepage_content", async (req, res) => {
  const connection = await connectDb();
  try {
    const [rows] = await connection.query(
      "SELECT * FROM homepage_content ORDER BY order_number"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching homepage content:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await connection.end();
  }
});

app.get("/about_section", async (req, res) => {
  const connection = await connectDb();
  try {
    const [rows] = await connection.query(
      "SELECT * FROM about_section ORDER BY id" // Adjust the ordering if needed
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching about section content:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await connection.end();
  }
});

app.get("/benefits", async (req, res) => {
  const connection = await connectDb();
  try {
    // Query to get benefits and their bullet points
    const [benefits] = await connection.query(
      `SELECT b.id AS benefit_id, b.title, bp.point
       FROM Benefits b
       LEFT JOIN BenefitPoints bp ON b.id = bp.benefit_id
       ORDER BY b.id`
    );

    // Organize the results into a more structured format
    const organizedBenefits = benefits.reduce((acc, curr) => {
      const { benefit_id, title, point } = curr;

      // Check if the benefit already exists in the accumulator
      if (!acc[benefit_id]) {
        acc[benefit_id] = { id: benefit_id, title: title, points: [] };
      }

      // If there's a point, add it to the points array
      if (point) {
        acc[benefit_id].points.push(point);
      }

      return acc;
    }, {});

    // Convert the organized object back to an array
    const result = Object.values(organizedBenefits);

    res.json(result);
  } catch (error) {
    console.error("Error fetching benefits:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await connection.end();
  }
});

app.get("/banners", async (req, res) => {
  const connection = await connectDb();
  try {
    const [rows] = await connection.query("SELECT * FROM banners");

    if (rows.length === 0) {
      return res.status(404).json({ error: "No banners found" });
    }

    // Construct the full URL for the image
    const updatedRows = rows.map((row) => ({
      ...row,
      image: `http://localhost:5000${row.image}`, // Adjust this line
    }));

    res.json(updatedRows); // Send the updated rows back to the client
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await connection.end();
  }
});

app.post("/banners", upload.single("image"), async (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null; // Prepend /uploads/ to the filename
  const connection = await connectDb();
  try {
    const [result] = await connection.query("INSERT INTO banners SET ?", {
      title,
      description,
      image,
    });
    res.status(201).json({ id: result.insertId, title, description, image });
  } catch (error) {
    console.error("Error adding banner:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await connection.end();
  }
});

// Connect to the MySQL database
const connectDb = async () => {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
};

// Sample endpoint
app.get("/getData", async (req, res) => {
  res.send("Hey Abdullah ");
});

// Members CRUD
app.get("/members", async (req, res) => {
  const connection = await connectDb();
  try {
    const [rows] = await connection.query(
      "SELECT title, image, position FROM members"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await connection.end();
  }
});

app.post("/members", upload.single("image"), async (req, res) => {
  const { title, position, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null; // Prepend /uploads/ to the filename
  const connection = await connectDb();
  try {
    const [result] = await connection.query("INSERT INTO members SET ?", {
      image,
      title,
      position,
      description,
    });
    res
      .status(201)
      .json({ id: result.insertId, title, position, description, image });
  } catch (error) {
    console.error("Error adding member:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await connection.end();
  }
});

// Add more CRUD operations for members (PUT, DELETE) as needed

// Events CRUD
app.get("/events", async (req, res) => {
  const connection = await connectDb();
  const [rows] = await connection.query(
    "SELECT image, title, description, location, DATE_FORMAT(date, '%M %d, %Y') AS formatted_date, time, status FROM events"
  );
  res.json(rows);
  await connection.end();
});

app.post("/events", upload.single("image"), async (req, res) => {
  const { title, description, location, date, time } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null; // Prepend /uploads/ to the filename
  const connection = await connectDb();
  try {
    const [result] = await connection.query("INSERT INTO events SET ?", {
      image,
      title,
      description,
      location,
      date,
      time,
    });
    res.status(201).json({ id: result.insertId, ...req.body, image });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await connection.end();
  }
});

// Add more CRUD operations for events (PUT, DELETE) as needed

// Users CRUD (for authentication)
app.post("/users", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const connection = await connectDb();
  const [result] = await connection.query("INSERT INTO users SET ?", {
    first_name,
    last_name,
    email,
    password, // Make sure to hash passwords in production
  });
  res.status(201).json({ id: result.insertId, email });
  await connection.end();
});

// Dynamic Data CRUD
app.get("/dynamic_data", async (req, res) => {
  const connection = await connectDb();
  const [rows] = await connection.query("SELECT * FROM dynamic_data");
  res.json(rows);
  await connection.end();
});

app.post("/dynamic_data", async (req, res) => {
  const { key, title, image, description, is_active } = req.body;
  const connection = await connectDb();
  const [result] = await connection.query("INSERT INTO dynamic_data SET ?", {
    key,
    title,
    image,
    description,
    is_active,
  });
  res.status(201).json({ id: result.insertId, ...req.body });
});

app.post("/signup", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const connection = await connectDb();
  try {
    // Check if user already exists
    const [existingUser] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const [result] = await connection.query("INSERT INTO users SET ?", {
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ id: result.insertId, email });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await connection.end();
  }
});

// User Sign-In
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const connection = await connectDb();
  try {
    // Find the user by email
    const [rows] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = rows[0];

    // Check if the password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      "your_jwt_secret_key",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await connection.end();
  }
});

app.post("/headers", upload.single("background_image"), async (req, res) => {
  const { title, description } = req.body;
  const background_image = req.file ? `/uploads/${req.file.filename}` : null; // Prepend /uploads/ to the filename
  const connection = await connectDb();
  try {
    const [result] = await connection.query("INSERT INTO headers SET ?", {
      title,
      description,
      background_image,
    });
    res
      .status(201)
      .json({ id: result.insertId, title, description, background_image });
  } catch (error) {
    console.error("Error adding header:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await connection.end();
  }
});

// Start the server
app.listen(5000, () => console.log("App is running on http://localhost:5000"));
