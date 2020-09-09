const chalk = require("chalk");

const TripDetails = require("../models/tripdetails");
const TripBrochure = require("../models/tripBrochure");
const ServiceProviderTrip = require("../models/serviceProviderTrip");
const TripExtraServices = require("../models/tripExtraServices");
const TripMedia = require("../models/tripMedia");

var ERROR = [];

exports.postAddProduct = (req, res, next) => {
  ServiceProviderTrip.create({
    userId: req.body.userId,
    locationId: req.body.locationId,
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
  const TripID = req.body.tripId;
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
                        spt: spt,
                        tb: tb,
                        td: td,
                        tes: tes,
                        tm: tm,
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

exports.patchProduct = (req, res, next) => {

};

exports.deleteProduct = (req, res, next) => {
  
};

//   exports.getEditProduct = (req, res, next) => {
//     const editMode = req.query.edit;
//     if (!editMode) {
//       return res.redirect('/');
//     }
//     const prodId = req.params.productId;
//     Product.findById(prodId, product => {
//       if (!product) {
//         return res.redirect('/');
//       }
//       res.render('admin/edit-product', {
//         pageTitle: 'Edit Product',
//         path: '/admin/edit-product',
//         editing: editMode,
//         product: product
//       });
//     });
//   };

//   exports.postEditProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     const updatedTitle = req.body.title;
//     const updatedPrice = req.body.price;
//     const updatedImageUrl = req.body.imageUrl;
//     const updatedDesc = req.body.description;
//     const updatedProduct = new Product(
//       prodId,
//       updatedTitle,
//       updatedImageUrl,
//       updatedDesc,
//       updatedPrice
//     );
//     updatedProduct.save();
//     res.redirect('/admin/products');
//   };

//   exports.getProducts = (req, res, next) => {
//     Product.fetchAll(products => {
//       res.render('admin/products', {
//         prods: products,
//         pageTitle: 'Admin Products',
//         path: '/admin/products'
//       });
//     });
//   };

//   exports.postDeleteProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     Product.deleteById(prodId);
//     res.redirect('/admin/products');
//   };
