module.exports = (app) => {
  const partnerController = require("../controllers/partners.controller.js");
  const upload = require("../middlewares/multer"); // Import multer middleware

  var router = require("express").Router();
  router.post("/partners", upload.any(), partnerController.create); // Create a new partner
  router.get("/partners", partnerController.findAll); // Get all partners
  router.delete("/partners/:id", partnerController.delete); // Delete a partner by ID

  app.use("/api", router); // Mount the router on the /api path
};
