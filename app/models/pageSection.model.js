module.exports = (sequelize, Sequelize) => {
  const PageSection = sequelize.define(
    "page_sections",
    {
      page_name: {
        type: Sequelize.STRING,
        allowNull: false, // Ensure that this field is required
      },
      section_name: {
        type: Sequelize.STRING,
        allowNull: false, // Ensure that this field is required
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false, // Ensure that this field is required
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false, // Ensure that this field is required
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: true, // This can be null if no image is provided
      },
    },
    {
      tableName: "page_sections", // Explicitly specify the table name
      timestamps: false, // If you don't need timestamp fields (createdAt/updatedAt)
    }
  );

  return PageSection;
};
