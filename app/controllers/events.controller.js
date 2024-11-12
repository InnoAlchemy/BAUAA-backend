const db = require("../models"); // Import models from db.js
const Event = db.events;

// Create a new Event
exports.createEvent = async (req, res) => {
  const { name, fee, city, country, date, endDate, status } = req.body;
  console.log(req.body);
  console.log("-------------");
  console.log(req.files);

  const file = req.files.find((file) => file.fieldname === name);
  console.log(file);
  console.log("--------");

  let image = null;
  if (file) {
    image = `/uploads/${file.filename}`; // If the file matches, use its filename
  }
  console.log(image);

  try {
    const newEvent = await Event.create({
      name,
      image, // Assign image if file matches
      fee,
      city,
      country,
      date,
      endDate,
      status,
    });
    return res
      .status(201)
      .send({ message: "Event created successfully", data: newEvent });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error creating event", error: error.message });
  }
};

// Retrieve all Events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    return res.status(200).send(events);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error fetching events", error: error.message });
  }
};

// Retrieve a single Event by ID
exports.getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).send({ message: "Event not found" });
    }
    return res.status(200).send(event);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error fetching event", error: error.message });
  }
};

// Update an Event by ID
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, fee, city, country, date, endDate, status } = req.body;

  // Find the file that matches the event name
  const file = req.files.find((file) => file.fieldname === name); // Match image with event name

  let image = null;
  if (file) {
    image = `/uploads/${file.filename}`; // Use the image URL if it matches
  }

  try {
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).send({ message: "Event not found" });
    }

    // Prepare the data to update
    const updateData = {
      name: name || event.name,
      fee: fee || event.fee,
      city: city || event.city,
      country: country || event.country,
      date: date || event.date,
      endDate: endDate || event.endDate,
      status: status || event.status,
    };

    // Conditionally add the image URL if a file is uploaded
    if (image) {
      updateData.image = image; // If image file matches, update the event image URL
    }

    // Update the event data in the database
    await event.update(updateData);
    return res
      .status(200)
      .send({ message: "Event updated successfully", data: event });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error updating event", error: error.message });
  }
};

// Delete an Event by ID
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Event.destroy({ where: { id } });
    if (result === 0) {
      return res.status(404).send({ message: "Event not found" });
    }
    return res.status(200).send({ message: "Event deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error deleting event", error: error.message });
  }
};
