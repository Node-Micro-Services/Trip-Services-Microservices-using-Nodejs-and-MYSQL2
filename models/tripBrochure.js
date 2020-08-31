const Sequelize = require('sequelize').Sequelize

const sequelize = require('../util/database')

const TripBrochure = sequelize.define('tripbrochure', {
    tripId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    brochureURL: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = TripBrochure