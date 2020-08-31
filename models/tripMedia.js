const Sequelize = require('sequelize').Sequelize

const sequelize = require('../util/database')

const TripMedia = sequelize.define('tripmedia', {
    tripId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    brochureURL: {
        type: Sequelize.toString,
        allowNull: false
    }
})

module.exports = TripMedia