const Sequelize = require("sequelize").Sequelize;
const sequelize = new Sequelize("trip", "root", "trip@0123", {
  dialect: "mysql",
  host: "mysql"
});
module.exports = sequelize;