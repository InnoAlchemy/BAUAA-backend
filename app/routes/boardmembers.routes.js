module.exports = (app) => {
  const boardMemberController = require("../controllers/boardmembers.controller.js");
  const upload = require("../middlewares/multer"); // Import multer middleware

  var router = require("express").Router();
  
  router.post("/create-member", upload.any(), boardMemberController.create);
  router.get("/boardmembers", boardMemberController.findAll);
  router.delete("/boardmembers/:id", boardMemberController.delete);

  app.use("/api", router); // Mount the router on the /api path
};
