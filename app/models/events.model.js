module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define(
    "events",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fee: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      totalUsers: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.ENUM("Active", "Inactive"),
        allowNull: false,
      },
    },
    {
      tableName: "events",
      timestamps: false,
    }
  );

  // Define associations
  Event.associate = (models) => {
    Event.belongsToMany(models.User, {
      through: "UserEvents",
      as: "registeredUsers",
      foreignKey: "event_id",
    });
  };

  return Event;
};
