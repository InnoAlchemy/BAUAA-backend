module.exports = (app) => {
  const page_meth = require("../controllers/pageSection.controller.js");
  const upload = require("../middlewares/multer"); // Import multer middleware

  var router = require("express").Router();

  // Route to handle multiple image uploads
  router.post("/:page_name", upload.any(), page_meth.update);
  router.get("/:page_name", page_meth.getAll);

  app.use("/update-section", router); // Prefix all routes with /update-section
};
