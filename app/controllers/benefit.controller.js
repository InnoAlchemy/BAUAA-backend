const db = require("../models");  // Import models from db.js
const Benefit = db.benefit;
const BenefitPoints = db.benefitPoints;

// Update a Benefit by ID
exports.updateBenefit = async (req, res) => {
  const { id } = req.params;  // Get the benefit ID from the URL parameters
  const { title } = req.body; // Get the updated title from the request body

  try {
    const benefit = await Benefit.findByPk(id); // Find the benefit by primary key (ID)
    if (!benefit) {
      return res.status(404).send({ message: "Benefit not found" });
    }

    // Update the benefit's title
    benefit.title = title || benefit.title; // Only update if provided
    await benefit.save(); // Save the updated benefit

    return res.status(200).send({ message: "Benefit updated successfully", data: benefit });
  } catch (error) {
    return res.status(500).send({ message: "Error updating benefit", error: error.message });
  }
};

// Update Benefit Points by ID
exports.updateBenefitPoint = async (req, res) => {
  const { id } = req.params;  // Get the benefit point ID from the URL parameters
  const { content, title_id } = req.body; // Get the updated content and title_id from the request body

  try {
    const benefitPoint = await BenefitPoints.findByPk(id); // Find the benefit point by primary key (ID)
    if (!benefitPoint) {
      return res.status(404).send({ message: "Benefit point not found" });
    }

    // Update the benefit point's content and title_id if provided
    benefitPoint.content = content || benefitPoint.content;
    benefitPoint.title_id = title_id || benefitPoint.title_id; // Link to the benefit if title_id is provided
    await benefitPoint.save(); // Save the updated benefit point

    return res.status(200).send({ message: "Benefit point updated successfully", data: benefitPoint });
  } catch (error) {
    return res.status(500).send({ message: "Error updating benefit point", error: error.message });
  }
};
