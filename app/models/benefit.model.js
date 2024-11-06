module.exports = (sequelize, Sequelize) => {
  const Benefit = sequelize.define(
    "benefits",
    {
      title: {
        type: Sequelize.STRING,
        allowNull: false, // Each title is required
      },
    },
    {
      tableName: "benefits", // Explicitly specify the table name
      timestamps: false, // No timestamp fields if you don't need them
    }
  );

  return Benefit;
};
