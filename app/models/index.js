const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import the models
db.pageSection = require("./pageSection.model.js")(sequelize, Sequelize);
db.benefit = require("./benefit.model.js")(sequelize, Sequelize); // Import the Benefit model
db.benefitPoints = require("./benefitPoints.model.js")(sequelize, Sequelize); // Import the BenefitPoints model
db.users = require("./users.model.js")(sequelize, Sequelize);
db.boardmembers = require("./boardmembers.model.js")(sequelize, Sequelize);
db.partners = require("./partners.model.js")(sequelize, Sequelize);
db.inbox = require("./inbox.model.js")(sequelize, Sequelize);
db.events = require("./events.model.js")(sequelize, Sequelize);
// Define associations (if any) after importing models
db.benefit.hasMany(db.benefitPoints, {
  foreignKey: "title_id",
  as: "benefitPoints",
}); // One benefit has many points
db.benefitPoints.belongsTo(db.benefit, {
  foreignKey: "title_id",
  as: "benefit",
}); // Each point belongs to one benefit

db.users.belongsToMany(db.events, {
  through: "UserEvents",
  as: "events",
  foreignKey: "user_id",
});
db.events.belongsToMany(db.users, {
  through: "UserEvents",
  as: "registeredUsers",
  foreignKey: "event_id",
});

module.exports = db;
