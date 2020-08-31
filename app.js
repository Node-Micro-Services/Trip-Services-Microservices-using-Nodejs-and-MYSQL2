const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const tripRoute = require('./routes/trip')

const app = express();

app.use('/trip', tripRoute)

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(8080);
  })
  .catch((error) => {
    console.log(error);
  });

