const Sequelize = require("sequelize").Sequelize;

const sequelize = require("../util/database");

const TripDetails = sequelize.define(
  "tripdetails",
  {
    tripID: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
  },
  {
    timestamps: false,
  }
);

module.exports = TripDetails;
