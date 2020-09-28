const Sequelize = require("sequelize").Sequelize;
//include the comment when to involve for real db.
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DBNAME || "trip",
  process.env.UNAME || "root",
  process.env.PASSWORD,
  {
    dialect: "mysql",
    host: process.env.HOST || "mysql",
  }
);
// const sequelize = new Sequelize(
//   process.argv[2] || "trip",
//   process.argv[3] || "root",
//   process.argv[4] || "shivamsharma1",
//   {
//     dialect: "mysql",
//     host: process.argv[5] || "localhost",
//   }
// );
module.exports = sequelize;