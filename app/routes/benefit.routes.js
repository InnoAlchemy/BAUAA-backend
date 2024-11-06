const express = require("express");
const router = express.Router();
const benefitController = require("../controllers/benefit.controller");

// Update Benefit by ID
router.put("/benefits/:id", benefitController.updateBenefit);

// Update Benefit Point by ID
router.put("/benefit-points/:id", benefitController.updateBenefitPoint);

module.exports = router;
