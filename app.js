const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const tripDetailsRoute = require('./models/tripdetails')

const app = express();

app.use('', (req, res) =>{
    res.send('<h1>Hello from DB</h1>')
})

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(8080);
  })
  .catch((error) => {
    console.log(error);
  });

