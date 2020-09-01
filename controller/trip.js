const TripDetails = require("../models/tripdetails");
const TripBrochure = require("../models/tripBrochure");
const ServiceProviderTrip = require("../models/serviceProviderTrip");
const TripExtraServices = require("../models/tripExtraServices");
const TripMedia = require("../models/tripMedia");

// exports.getAddProduct = (req, res, next) => {
//     res.render('admin/edit-product', {
//       pageTitle: 'Add Product',
//       path: '/admin/add-product',
//       editing: false
//     });
//   };

exports.postAddProduct = (req, res, next) => {
  const userId = req.body.userId;
  const locationId = req.body.locationId;

  const tripServiceId = req.body.trip.tripServiceId;
  const subject = req.body.trip.subject;
  const description = req.body.trip.description;
  const tripDays = req.body.trip.tripDays;
  const tripNights = req.body.trip.tripNights;
  var tripID = undefined

  TripDetails.create({
    tripServiceID: tripServiceId,
    tripDaysNum: tripDays,
    tripNightsNum: tripNights,
    subject: subject,
    description: description
  })
    .then((result) => {
      tripID = result.dataValues.tripID
      res.status(200).json({
        "Trip Service Response Payload": {
          status: 201,
          data: {
            tripId: tripID,
          },
          error: [],
        },
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(200).json({
        "Trip Service Response Payload": {
          status: 500,
          data: {
            tripId: tripID,
          },
          error: err,
        },
      })
    });
  // brochure code here

  //media code here

  //extraServices code here ...
  
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
