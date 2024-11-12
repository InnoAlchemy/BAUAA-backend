const db = require("../models"); // Import models from db.js
const Inbox = db.inbox;

// Create a new message
exports.createMessage = async (req, res) => {
  const { email, phone, message } = req.body;
  console.log("Received data:", req.body);

  try {
    // Try creating the message
    const newMessage = await Inbox.create({
      email,
      phone_number: phone, // Ensure this is the correct field name
      message,
      is_read: false, // Default to unread
      is_starred: false, // Default to unstarred
    });

    return res.status(201).send({
      message: "Message created successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error details:", error);

    // If the error is due to validation or another issue, log it
    if (error.name === "SequelizeValidationError") {
      return res.status(400).send({
        message: "Validation error",
        error: error.errors,
      });
    }

    return res.status(500).send({
      message: "Error creating message",
      error: error.message,
    });
  }
};

// Get all messages (for inbox view)
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Inbox.findAll();

    if (!messages || messages.length === 0) {
      return res.status(404).send({ message: "No messages found" });
    }

    return res.status(200).send({ messages });
  } catch (error) {
    return res.status(500).send({
      message: "Error fetching messages",
      error: error.message,
    });
  }
};

// Get only unread messages
exports.getUnreadMessages = async (req, res) => {
  try {
    const unreadMessages = await Inbox.findAll({
      where: { is_read: false },
    });

    if (!unreadMessages || unreadMessages.length === 0) {
      return res.status(404).send({ message: "No unread messages found" });
    }

    return res.status(200).send({ unreadMessages });
  } catch (error) {
    return res.status(500).send({
      message: "Error fetching unread messages",
      error: error.message,
    });
  }
};

// Get only starred messages
exports.getStarredMessages = async (req, res) => {
  try {
    const starredMessages = await Inbox.findAll({
      where: { is_starred: true },
    });

    if (!starredMessages || starredMessages.length === 0) {
      return res.status(404).send({ message: "No starred messages found" });
    }

    return res.status(200).send({ starredMessages });
  } catch (error) {
    return res.status(500).send({
      message: "Error fetching starred messages",
      error: error.message,
    });
  }
};

// Toggle read and star status in one method
exports.updateMessageStatus = async (req, res) => {
  const { id } = req.params;
  const { is_read, is_starred } = req.body;

  try {
    const message = await Inbox.findByPk(id);
    if (!message) {
      return res.status(404).send({ message: "Message not found" });
    }

    // Update the read status if provided
    if (typeof is_read !== "undefined") {
      message.is_read = is_read;
    }

    // Update the starred status if provided
    if (typeof is_starred !== "undefined") {
      message.is_starred = is_starred;
    }

    await message.save();

    return res.status(200).send({
      message: "Message status updated",
      is_read: message.is_read,
      is_starred: message.is_starred,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error updating message status",
      error: error.message,
    });
  }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await Inbox.findByPk(id);
    if (!message) {
      return res.status(404).send({ message: "Message not found" });
    }

    // Delete the message
    await message.destroy();

    return res.status(200).send({ message: "Message deleted successfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Error deleting message",
      error: error.message,
    });
  }
};
