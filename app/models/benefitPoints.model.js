module.exports = (sequelize, Sequelize) => {
    const BenefitPoints = sequelize.define(
      "benefits_points",
      {
        content: {
          type: Sequelize.STRING,
          allowNull: false, // Ensure content for each bullet point is required
        },
        title_id: {
          type: Sequelize.INTEGER,
          allowNull: false, // Ensure that each bullet point is linked to a title
          references: {
            model: "benefits", // Foreign key relation to the `benefits` table
            key: "id",
          },
          onDelete: "CASCADE", // If a title is deleted, its bullet points are also deleted
        },
      },
      {
        tableName: "benefits_points", // Explicitly specify the table name
        timestamps: false, // No timestamp fields if not needed
      }
    );
  
    // Setting the association between BenefitPoints and Benefit
    BenefitPoints.associate = (models) => {
      BenefitPoints.belongsTo(models.Benefit, {
        foreignKey: "title_id",
        as: "benefit", // Alias for the association
      });
    };
  
    return BenefitPoints;
  };
  