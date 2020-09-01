const Sequelize = require('sequelize').Sequelize

const sequelize = require('../util/database')

const TripMedia = sequelize.define('tripmedia', {
    tripID: {
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

module.exports = TripMedia