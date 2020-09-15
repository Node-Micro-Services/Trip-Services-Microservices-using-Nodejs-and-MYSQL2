const chalk = require("chalk");

const TripDetails = require("../models/tripdetails");
const TripBrochure = require("../models/tripBrochure");
const ServiceProviderTrip = require("../models/serviceProviderTrip");
const TripExtraServices = require("../models/tripExtraServices");
const TripMedia = require("../models/tripMedia");
const TripCategory = require("../models/tripCategory");
var ERROR = [];

exports.getProductParam = (req, res, next) => {
  const UserID = req.params.id;
  ServiceProviderTrip.findAll({ where: { userId: UserID } })
    .then((ress) => {
      res.status(200).json({
        result: ress,
      });
    })
    .catch((error) => {
      console.log(chalk.red.inverse(error));
      res.status(500).json({
        result: error,
      });
    });
};

//Completed
exports.postAddProduct = (req, res, next) => {
  ServiceProviderTrip.create({
    userId: req.body.userId,
    locationId: req.body.locationId,
    locationName: req.body.locationName
  })
    .then((result) => {
      const TripID = result.dataValues.tripID;
      console.log(chalk.green.inverse("Service Provider Trip"));

      //now creating the TripDetails Table
      TripDetails.create({
        tripID: TripID,
        tripServiceID: req.body.trip.tripServiceId,
        tripDaysNum: req.body.trip.tripDays,
        tripNightsNum: req.body.trip.tripNights,
        subject: req.body.trip.subject,
        description: req.body.trip.description,
      })
        .then((result) => {
          console.log(chalk.green.inverse("Trip Details Created"));
        })
        .catch((error) => {
          // add all the errors in an array
          ERROR.push(String(error));
        });
      for (var obj in req.body.brochure) {
        TripBrochure.create({
          tripID: TripID,
          brochureURL: req.body.brochure[obj],
        })
          .then((result) => {
            //do something for the result
            console.log(chalk.green.inverse("Trip Brochure"));
          })
          .catch((error) => {
            //do somethings for the error
            ERROR.push(String(error));
          });
      }

      for (var obj in req.body.media) {
        TripMedia.create({
          tripID: TripID,
          mediaURL: req.body.media[obj].mediaURL,
          isImage: req.body.media[obj].isImage,
          caption: req.body.media[obj].caption,
        })
          .then((result) => {
            //do something for the result
            console.log(chalk.green.inverse("Trip Media"));
          })
          .catch((error) => {
            //do somethings for the error
            ERROR.push(String(error));
          });
      }

      for (var obj in req.body.extraServices) {
        TripExtraServices.create({
          tripID: TripID,
          mediaURL: req.body.extraServices[obj],
        })
          .then((result) => {
            //do for the result
            console.log(chalk.green.inverse("Trip Extra Services"));
          })
          .catch((error) => {
            //do for the error
            ERROR.push(String(error));
          });
      }

      for (var obj in req.body.category) {
        TripCategory.create({
          tripID: TripID,
          categoryName: req.body.category[obj].categoryName
        })
          .then((result) => {
            //do something for the result
            console.log(chalk.green.inverse("Trip Category"));
          })
          .catch((error) => {
            //do somethings for the error
            ERROR.push(String(error));
          });
      }

      res.status(200).json({
        "Trip Service Response Payload": {
          status: 201,
          data: {
            tripId: TripID,
          },
          error: [],
        },
      });
    })

    .catch((error) => {
      //do for the error
      ERROR.push(String(error));
      console.log(chalk.red(error));
      //then wale ka code hai ye
      res.status(200).json({
        "Trip Service Response Payload": {
          status: 500,
          data: {
            tripId: 0,
          },
          error: ERROR,
        },
      });
    });

  // brochure code here

  //media code here

  //extraServices code here ...
};

exports.getProduct = (req, res, next) => {
  const TripID = req.params.id;
  console.log(chalk.blueBright.inverse(TripID));

  // const ResultSPT = async function start(){
  //   await ServiceProviderTrip.findAll({ where: { tripID: TripID } })
  // }

  ServiceProviderTrip.findOne({ where: { tripID: TripID } })
    .then((spt) => {
      TripBrochure.findAll({ where: { tripID: TripID } })
        .then((tb) => {
          TripDetails.findAll({ where: { tripID: TripID } })
            .then((td) => {
              TripExtraServices.findAll({ where: { tripID: TripID } })
                .then((tes) => {
                  TripMedia.findAll({ where: { tripID: TripID } })
                    .then((tm) => {
                      res.status(200).json({
                        serviceProviderTrip: spt,
                        tripBrochure: tb,
                        tripDetails: td,
                        tripExtraServices: tes,
                        tripMedia: tm,
                      });
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

//Completed
exports.deleteProduct = (req, res, next) => {
  const TripID = req.body.tripId;
  var Errors = [];
  async function start() {
    await ServiceProviderTrip.destroy({
      where: {
        tripID: TripID,
      },
    })
      .then((res) => {})
      .catch((err) => {
        Errors.push(err);
      });
    await TripBrochure.destroy({
      where: {
        tripID: TripID,
      },
    })
      .then((res) => {})
      .catch((err) => {
        Errors.push(err);
      });
    await TripDetails.destroy({
      where: {
        tripID: TripID,
      },
    })
      .then((res) => {})
      .catch((err) => {
        Errors.push(err);
      });
    await TripExtraServices.destroy({
      where: {
        tripID: TripID,
      },
    })
      .then((res) => {})
      .catch((err) => {
        Errors.push(err);
      });
    await TripMedia.destroy({
      where: {
        tripID: TripID,
      },
    })
      .then((res) => {})
      .catch((err) => {
        Errors.push(err);
      });
    await TripCategory.destroy({
      where: {
        tripID: TripID,
      },
    })
      .then((res) => {})
      .catch((err) => {
        Errors.push(err);
      });
  }
  start();
  res.status(200).json({
    result: Errors,
  });
};

exports.patchProduct = (req, res, next) => {
  const TripID = req.body.tripId;
  var Errors = [];

  async function start() {
    await ServiceProviderTrip.update(
      { userId: req.body.userId, locationId: req.body.locationId },
      {
        where: {
          tripID: req.body.tripID,
        },
      }
    );
    await TripDetails.update(
      {
        tripServiceID: req.body.trip.tripServiceID,
        tripNightsNum: req.body.trip.tripNightsNum,
        tripDaysNum: req.body.trip.tripDaysNum,
        description: req.body.trip.description,
        tripServiceID: req.body.trip.tripServiceID,
        subject: req.body.trip.subject,
      },
      {
        where: {
          tripID: req.body.tripID,
        },
      }
    );
    //TODO: Others cant be editted...
  }

  start();
  res.status(200).json({
    result: "working",
  });
};
