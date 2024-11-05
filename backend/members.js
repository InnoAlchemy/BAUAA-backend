import mysql from "mysql2/promise"; // Import mysql2 with promise support
import readline from "readline"; // To read input from the terminal
import fs from "fs"; // To read the image file

// MySQL connection configuration
const dbConfig = {
  host: "localhost",
  user: "root", // Default MySQL username for XAMPP
  password: "", // Default password is empty for root
  database: "bau", // Your database name
};

// Connect to the MySQL database
const connectDb = async () => {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
};

// Create readline interface for terminal input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to add a member with image upload
const addMember = async () => {
  const title = await question("Enter member title: ");
  const imagePath = "./events.png"; // Specify your image path here
  const position = await question("Enter member position: ");
  const description = await question("Enter member description: ");

  // Read the image file as a binary buffer
  let imageData;
  try {
    imageData = fs.readFileSync(imagePath); // Read file synchronously
  } catch (error) {
    console.log("Error reading image file:", error);
    return;
  }

  const connection = await connectDb();
  try {
    const [result] = await connection.query("INSERT INTO members SET ?", {
      title,
      image_data: imageData, // Store binary data in the image_data column
      position,
      description,
    });
    console.log(`Member added with ID: ${result.insertId}`);
  } catch (error) {
    console.error("Error adding member:", error);
  } finally {
    await connection.end();
  }
};

// Function to delete a member
const deleteMember = async () => {
  const id = await question("Enter member ID to delete: ");
  const connection = await connectDb();
  try {
    const [result] = await connection.query(
      "DELETE FROM members WHERE id = ?",
      [id]
    );
    if (result.affectedRows > 0) {
      console.log(`Member with ID: ${id} deleted.`);
    } else {
      console.log(`No member found with ID: ${id}`);
    }
  } catch (error) {
    console.error("Error deleting member:", error);
  } finally {
    await connection.end();
  }
};

// Function to ask a question and return a promise
const question = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

// Main function to run the script
const main = async () => {
  console.log("Welcome to the Member Management System");
  const action = await question(
    "Do you want to add or delete a member? (add/delete): "
  );

  if (action.toLowerCase() === "add") {
    await addMember();
  } else if (action.toLowerCase() === "delete") {
    await deleteMember();
  } else {
    console.log("Invalid action. Please enter 'add' or 'delete'.");
  }

  rl.close();
};

// Start the script
main();
