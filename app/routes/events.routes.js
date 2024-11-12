module.exports = (app) => {
  const eventController = require("../controllers/events.controller.js"); // Import the controller
  const upload = require("../middlewares/multer"); // Import multer middleware

  const router = require("express").Router();

  // Get all events
  router.get("/events", eventController.getAllEvents);

  // Get a single event by ID
  router.get("/events/:id", eventController.getEventById);

  // Create a new event
  router.post("/events", upload.any(), eventController.createEvent);

  // Update an event by ID
  router.put("/events/:id", upload.any(), eventController.updateEvent);

  // Delete an event by ID
  router.delete("/events/:id", eventController.deleteEvent);

  app.use("/api", router); // Mount the router on the /api path
};
