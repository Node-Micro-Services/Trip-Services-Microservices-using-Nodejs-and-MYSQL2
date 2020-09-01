const Sequelize = require('sequelize').Sequelize

const sequelize = require('../util/database')

const TripBrochure = sequelize.define('tripbrochure', {
    brochureID:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    tripID: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    brochureURL: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = TripBrochure