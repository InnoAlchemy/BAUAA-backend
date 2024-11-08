const express = require("express");
const router = express.Router(); // Initialize the router
const benefitController = require("../controllers/benefit.controller.js"); // Import the controller

// Update a Benefit by ID
router.post("/benefits/:id", benefitController.updateBenefit);

// Update Benefit Point by ID
router.post(
  "/benefit-points/:id/:pointId",
  benefitController.updateBenefitPoint
);

router.get("/benefit/:id", benefitController.getBenefitData);

module.exports = (app) => {
  app.use("/api", router); // Mount the router on the /api path
};
