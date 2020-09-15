const Sequelize = require("sequelize").Sequelize;

const sequelize = require("../util/database");

const TripCategory = sequelize.define(
  "tripcategory",
  {
    tripID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    categoryName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = TripCategory;
