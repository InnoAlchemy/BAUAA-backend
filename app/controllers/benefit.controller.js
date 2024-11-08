const db = require("../models"); // Import models from db.js
const Benefit = db.benefit;
const BenefitPoints = db.benefitPoints;

// Update a Benefit by ID
exports.updateBenefit = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  console.log(id);
  console.log(title);

  try {
    const benefit = await Benefit.findByPk(id);
    if (!benefit) {
      return res.status(404).send({ message: "Benefit not found" });
    }
    benefit.title = title || benefit.title;
    await benefit.save();
    return res
      .status(200)
      .send({ message: "Benefit updated successfully", data: benefit });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error updating benefit", error: error.message });
  }
};

exports.updateBenefitPoint = async (req, res) => {
  const { id, pointId } = req.params; // Extract benefit and point IDs from the URL
  const { content } = req.body; // Extract the updated content from the request body

  console.log(req.params);
  console.log(req.body);

  try {
    // Find the Benefit to ensure it exists
    const benefit = await Benefit.findByPk(id);
    if (!benefit) {
      return res.status(404).send({ message: "Benefit not found" });
    }

    // Find the specific BenefitPoint to update
    const benefitPoint = await BenefitPoints.findOne({
      where: { title_id: id, id: pointId }, // Use both title_id and pointId to locate the point
    });

    if (!benefitPoint) {
      return res.status(404).send({ message: "Bullet point not found" });
    }

    // Update the content of the found BenefitPoint
    await benefitPoint.update({
      content: content, // Update the content with the new one
    });

    return res
      .status(200)
      .send({ message: "Bullet point updated successfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Error updating bullet point",
      error: error.message,
    });
  }
};

exports.getBenefitData = async (req, res) => {
  const { id } = req.params;

  console.log(req.params);
  console.log("-----------------------------");

  try {
    // Fetch the Benefit by ID (including all related data)
    const benefit = await Benefit.findByPk(id, {
      include: [
        {
          model: BenefitPoints,
          as: "benefitPoints", // Specify the alias here
        },
      ],
    });

    if (!benefit) {
      return res.status(404).send({ message: "Benefit not found" });
    }

    // Return all benefit data, including the benefit title and associated points
    console.log(benefit);

    return res.status(200).send({
      benefitTitle: benefit.title,
      benefitDescription: benefit.description, // Make sure you have the 'description' field in your model
      benefitPoints: benefit.benefitPoints, // Fetch associated BenefitPoints using the alias
    });
  } catch (error) {
    console.error("Error fetching benefit data:", error); // Log the full error
    return res.status(500).send({
      message: "Error fetching benefit data",
      error: error.message,
    });
  }
};
