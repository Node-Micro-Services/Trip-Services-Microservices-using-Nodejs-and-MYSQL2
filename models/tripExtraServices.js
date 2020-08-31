const Sequelize = require('sequelize').Sequelize

const sequelize = require('../util/database')

const TripExtraService = sequelize.define('tripextraservice', {
    tripId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    mediaURL: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = TripBrochure