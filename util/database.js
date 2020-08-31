const Sequelize = require("sequelize").Sequelize;
const sequelize = new Sequelize("trip", "root", "shivamsharma1", {
  dialect: "mysql",
  host: "localhost",
});
module.exports = sequelize;
