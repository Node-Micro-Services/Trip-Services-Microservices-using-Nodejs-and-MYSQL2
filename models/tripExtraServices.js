const Sequelize = require("sequelize").Sequelize;

const sequelize = require("../util/database");

const TripExtraService = sequelize.define(
  "tripextraservice",
  {
    tripID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    mediaURL: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = TripExtraService;
