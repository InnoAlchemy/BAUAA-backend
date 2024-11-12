module.exports = (sequelize, Sequelize) => {
    const Inbox = sequelize.define(
      "inbox", // Model name, this will represent the 'inbox' table
      {
        email: {
          type: Sequelize.STRING,
          allowNull: false, // Email is required
        },
        phone_number: {
          type: Sequelize.STRING,
          allowNull: false, // Phone number is required
        },
        message: {
          type: Sequelize.TEXT,
          allowNull: false, // Message content is required
        },
        message_time: {
          type: Sequelize.DATE,
          allowNull: false, // The exact time the message is sent
          defaultValue: Sequelize.NOW, // Default to the current time if not provided
        },
        is_read: {
          type: Sequelize.BOOLEAN,
          allowNull: false, // Status is required
          defaultValue: false, // Default to unread (false)
        },
        is_starred: {
          type: Sequelize.BOOLEAN,
          allowNull: false, // The starred status is required
          defaultValue: false, // Default to false (unstarred)
        },
      },
      {
        tableName: "inbox", // Explicitly specify the table name
        timestamps: false, // No automatic timestamps (createdAt/updatedAt)
      }
    );
  
    return Inbox;
  };
  