const Sequelize = require('sequelize').Sequelize

const sequelize = require('../util/database')

const ServiceProviderTrip = sequelize.define('serviceprovidertrip', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    locationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    tripId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})

module.exports = ServiceProviderTrip