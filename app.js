const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const tripRoute = require("./routes/trip");

const ServiceProviderTrip = require("./models/serviceProviderTrip");
const TripBrochure = require("./models/tripBrochure");
const TripDetails = require("./models/tripdetails");
const TripMedia = require("./models/tripMedia");
const TripExtraServices = require("./models/tripExtraServices");

const app = express();

app.use(bodyParser.json());

app.use("/trips", tripRoute);

ServiceProviderTrip.hasMany(TripDetails, { foreignKey: "tripID" });
ServiceProviderTrip.hasMany(TripBrochure, { foreignKey: "tripID" });
ServiceProviderTrip.hasMany(TripMedia, { foreignKey: "tripID" });
ServiceProviderTrip.hasMany(TripExtraServices, { foreignKey: "tripID" });

sequelize
  // .sync({force: true})  ---> to overwrite the tables better say format all...
  .sync({ force: true })
  .then((result) => {
    // console.log(result);
    app.listen(8080);
  })
  .catch((error) => {
    console.log(error);
  });
