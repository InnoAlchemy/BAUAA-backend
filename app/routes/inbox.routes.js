module.exports = (app) => {
  const inboxController = require("../controllers/inbox.controller.js"); // Import the controller

  var router = require("express").Router();

  // Get all messages
  router.get("/inbox", inboxController.getAllMessages);

  // Get only unread messages
  router.get("/inbox/unread", inboxController.getUnreadMessages);

  // Create a new message
  router.post("/inbox", inboxController.createMessage);

  router.post("/inbox/:id/status", inboxController.updateMessageStatus);``

  // Delete a message
  router.delete("/inbox/:id", inboxController.deleteMessage);

  app.use("/api", router); // Mount the router on the /api path
};
