const chalk = require("chalk");

const TripDetails = require("../models/tripdetails");
const TripBrochure = require("../models/tripBrochure");
const ServiceProviderTrip = require("../models/serviceProviderTrip");
const TripExtraServices = require("../models/tripExtraServices");
const TripMedia = require("../models/tripMedia");
const TripCategory = require("../models/tripCategory");
var ERROR = [];

//Impossible event
exports.getProductParam = (req, res, next) => {
    const UserID = req.params.id;
    var Error = [];
    const Reply = [];

    const main = async () => {
        await ServiceProviderTrip.findAll({ where: { userId: UserID } })
            .then((result) => {
                //TODO: to iterate in the result the for each result
                const json = result;
                let locations = new Set();
                let dict = {};

                for (var i = 0; i < json.length; i++) {
                    var obj = json[i];
                    var locationId = obj.locationId;
                    var locationName = obj.locationName;
                    locations.add(locationId);
                    dict[locationId] = locationName;
                }

                locations.forEach((location) => {
                    //for each locationID we are searching now
                    const getTrips = async () => {
                        const trips = await ServiceProviderTrip.findAll({
                            where: { locationId: location, userId: UserID },
                        })
                            .then((result2) => {
                                //TODO: to get the tripid of those locationid having same
                                const trips = [];
                                const json2 = result2;
                                for (var i = 0; i < json2.length; i++) {
                                    var obj = json2[i];
                                    var tripId = obj.tripID;
                                    trips.push(tripId);
                                }
                                return trips;
                            })
                            .catch((error) => {
                                console.log(chalk.red.inverse.bold(error));
                            });
                        console.log(
                            chalk.blue.inverse.bold(location, dict[location])
                        );
                        console.log(chalk.yellow.inverse.bold(trips));
                        const TripsData = [];
                        await trips.forEach((trip) => {
                            async function start() {
                                const url = await TripMedia.findOne({
                                    where: { tripID: trip },
                                })
                                    .then((result3) => {
                                        const url = result3.mediaURL;
                                        console.log(
                                            chalk.blue.bold.inverse(url)
                                        );
                                        return url;
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });

                                const subject = await TripDetails.findOne({
                                    where: { tripID: trip },
                                })
                                    .then((result3) => {
                                        const subject = result3.subject;
                                        console.log(
                                            chalk.blue.bold.inverse(subject)
                                        );
                                        return subject;
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });

                                
                                TripsData.push({
                                    tripId: trip,
                                    mediaURL: url,
                                    subject: subject,
                                });
                                console.log(chalk.red.inverse.bold(JSON.stringify(TripsData)));
                            }
                            start();
                        });
                        console.log(chalk.red.bold.inverse(TripsData))
                        Reply.push({
                            "locationId":location,
                            "locationName": dict[location],
                            "trips": TripsData
                        })
                        console.log(chalk.greenBright.inverse.bold(JSON.stringify(Reply)));
                    };

                    getTrips();
                });

                res.status(200).json({
                    reply: { data: Reply },
                    errors: Error,
                });
            })
            .catch((error) => {
                console.log(chalk.red.inverse(error));
                Error.push(error);
                res.status(200).json({
                    reply: { data: Reply },
                    errors: Error,
                });
            });
    };
    main();
};

//Completed
exports.postAddProduct = (req, res, next) => {
    ServiceProviderTrip.create({
        userId: req.body.userId,
        locationId: req.body.locationId,
        locationName: req.body.locationName,
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
                    serviceID: req.body.extraServices[obj],
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
                    categoryName: req.body.category[obj].categoryName,
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

//Completed
exports.getProduct = (req, res, next) => {
    const TripID = req.params.id;
    console.log(chalk.blueBright.inverse(TripID));

    ServiceProviderTrip.findOne({ where: { tripID: TripID } })
        .then((spt) => {
            TripBrochure.findAll({ where: { tripID: TripID } })
                .then((tb) => {
                    TripDetails.findAll({ where: { tripID: TripID } })
                        .then((td) => {
                            TripExtraServices.findAll({
                                where: { tripID: TripID },
                            })
                                .then((tes) => {
                                    TripMedia.findAll({
                                        where: { tripID: TripID },
                                    })
                                        .then((tm) => {
                                            TripCategory.findAll({
                                                where: { tripID: TripID },
                                            })
                                                .then((tc) => {
                                                    res.status(200).json({
                                                        serviceProviderTrip: spt,
                                                        tripBrochure: tb,
                                                        tripDetails: td,
                                                        tripExtraServices: tes,
                                                        tripMedia: tm,
                                                        tripCategory: tc,
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
//Completed
exports.patchProduct = (req, res, next) => {
    const TripID = req.body.tripID;
    var Errors = [];

    async function start() {
        await ServiceProviderTrip.update(
            {
                userId: req.body.userId,
                locationId: req.body.locationId,
                locationName: req.body.locationName,
            },
            {
                where: {
                    tripID: TripID,
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
        //for trip Brochure
        async function tempo() {
            var remove = req.body.brochure.removed;
            var added = req.body.brochure.added;
            await remove.forEach((url) => {
                TripBrochure.destroy({
                    where: {
                        tripID: TripID,
                        brochureURL: url,
                    },
                })
                    .then((result) => {
                        console.log(chalk.blue.inverse.bold("TB removed"));
                    })
                    .catch((error) => {
                        Errors.push(error);
                    });
            });
            await added.forEach((url) => {
                TripBrochure.create({
                    tripID: TripID,
                    brochureURL: url,
                })
                    .then((result) => {
                        console.log(chalk.blue.inverse.bold("TB added"));
                    })
                    .catch((error) => {
                        Errors.push(error);
                    });
            });
        }
        await tempo();

        async function tempo2() {
            var remove = req.body.extraServices.removed;
            var added = req.body.extraServices.added;
            await remove.forEach((id) => {
                TripExtraServices.destroy({
                    where: {
                        tripID: TripID,
                        serviceID: id,
                    },
                })
                    .then((result) => {
                        console.log(chalk.blue.inverse.bold("TES removed"));
                    })
                    .catch((error) => {
                        Errors.push(error);
                    });
            });
            await added.forEach((id) => {
                TripExtraServices.create({
                    tripID: TripID,
                    serviceID: id,
                })
                    .then((result) => {
                        console.log(chalk.blue.inverse.bold("TES added"));
                    })
                    .catch((error) => {
                        Errors.push(error);
                    });
            });
        }

        await tempo2();
    }

    start();

    res.status(200).json({
        result: "working",
        error: Errors,
    });
};
