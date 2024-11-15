const bcrypt = require("bcryptjs");

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
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      otp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "user", // Default role set to 'user'
        validate: {
          isIn: [["user", "admin"]], // Role can only be 'user' or 'admin'
        },
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );

  // Hash the password before creating a new user
  User.beforeCreate(async (user) => {
    if (user.password) {
      try {
        user.password = await bcrypt.hash(user.password, 10);
      } catch (error) {
        throw new Error("Error hashing password before user creation");
      }
    }
  });

  // Hash the password before updating a user if it has changed
  User.beforeUpdate(async (user) => {
    if (user.password && user.changed("password")) {
      try {
        user.password = await bcrypt.hash(user.password, 10);
      } catch (error) {
        throw new Error("Error hashing password before user update");
      }
    }
  });

  // Define associations
  User.associate = (models) => {
    User.belongsToMany(models.Event, {
      through: "UserEvents",
      as: "events",
      foreignKey: "user_id",
    });
  };

  return User;
};
