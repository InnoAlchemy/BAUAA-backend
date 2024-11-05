import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";

// Test data for updating the 'about' page
const sectionName = "aboutHeader"; // Example section to update
const title = "Updated About Header Title";
const description = "Updated description for About Header";
const imagePath = "test.jpeg"; // Path to your test image

async function testUpdateAbout() {
  const formData = new FormData();
  formData.append("section_name", sectionName);
  formData.append("title", title);
  formData.append("description", description);

  // Append image if you have a test image
  if (fs.existsSync(imagePath)) {
    formData.append("image", fs.createReadStream(imagePath));
  }

  try {
    const response = await axios.post("http://localhost:5000/about", formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error updating about content:", error.response.data);
  }
}

// Run the test
testUpdateAbout();
