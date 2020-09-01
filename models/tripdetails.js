const Sequelize = require("sequelize").Sequelize;

const sequelize = require("../util/database");

const TripDeails = sequelize.define("tripdetails", {
  tripID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  tripDaysNum: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  tripNightsNum: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  subject: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tripServiceID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = TripDeails;
