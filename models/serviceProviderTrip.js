const Sequelize = require("sequelize").Sequelize

const sequelize = require('../util/database')

const ServiceProviderTrip = sequelize.define('serviceprovidertrip', {
    tripID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    locationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})

module.exports = ServiceProviderTrip