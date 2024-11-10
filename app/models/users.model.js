module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, // Required field
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false, // Required field
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: false, // Required field
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false, // Required field
      },
      event_status: {
        type: Sequelize.ENUM("Joined", "Pending"),
        allowNull: false, // Required field
      },
    },
    {
      tableName: "users", // Explicitly specify the table name
      timestamps: false, // Disable timestamps (createdAt/updatedAt)
    }
  );

  return User;
};
