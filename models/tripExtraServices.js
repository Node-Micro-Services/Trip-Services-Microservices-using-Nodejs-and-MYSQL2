const Sequelize = require("sequelize").Sequelize;

const sequelize = require("../util/database");

const TripExtraService = sequelize.define(
  "tripextraservice",
  {
    tripID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    serviceID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = TripExtraService;
