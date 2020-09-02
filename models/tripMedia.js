const Sequelize = require("sequelize").Sequelize;

const sequelize = require("../util/database");

const TripMedia = sequelize.define("tripmedia", {
  tripID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  mediaURL: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isImage: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  caption: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = TripMedia;
