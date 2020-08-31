const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const app = express();

sequelize
  .sync()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(8080);
