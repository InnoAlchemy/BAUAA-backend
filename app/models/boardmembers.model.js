module.exports = (sequelize, Sequelize) => {
  const BoardMember = sequelize.define(
    "boardmembers", // Table name for boardmembers
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false, // Name is required
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false, // Email is required for boardmembers
        validate: {
          isEmail: true, // Ensures that the email format is correct
        },
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false, // Position is required for boardmembers
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true, // Image field is optional
      },
    },
    {
      tableName: "boardmembers", // Table name explicitly defined
      timestamps: false, // If no timestamps are required (createdAt/updatedAt)
    }
  );

  return BoardMember;
};
