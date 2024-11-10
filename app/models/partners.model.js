module.exports = (sequelize, Sequelize) => {
    const Partner = sequelize.define(
      "partners", // Table name for partners
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false, // Name is required
        },
        image_url: {
          type: Sequelize.STRING,
          allowNull: true, // Image URL is optional
        },
        url_link: {
          type: Sequelize.STRING,
          allowNull: true, // URL link is optional
        },
      },
      {
        tableName: "partners", // Table name explicitly defined
        timestamps: false, // If no timestamps are required (createdAt/updatedAt)
      }
    );
  
    return Partner;
  };
  