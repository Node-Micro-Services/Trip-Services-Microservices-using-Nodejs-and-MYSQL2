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
  ServiceProviderTrip.create({
    userId: req.body.userId,
    locationId: req.body.locationId,
  })
    .then((result) => {
      const TripID = result.dataValues.tripID;
      console.log(TripID)

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
          console.log('Trip Details Created')
        })
        .catch((err) => {
          // add all the errors in an array
        });
      for(var obj in req.body.brochure){
        TripBrochure.create({
          tripID: TripID,
          brochureURL: req.body.brochure[obj]
        }).then(result=>{
          //do something for the result
        }).catch(err=>{
          //do somethings for the error
        })
      }

      for(var obj in req.body.media){
        TripMedia.create({
          tripID: TripID,
          mediaURL: req.body.media[obj].mediaURL,
          isImage:  req.body.media[obj].isImage,
          caption: req.body.media[obj].caption
        }).then(result=>{
          //do something for the result
        }).catch(err=>{
          //do somethings for the error
        })
      }

      for(var obj in req.body.extraServices){
        TripExtraServices.create({
          tripID: TripID,
          mediaURL: req.body.extraServices[obj]
        }).then(result=>{
          //do for the error
        })
        .catch(err=>{
          //do for the error
        })
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
      console.log(error)
      //then wale ka code hai ye
      res.status(200).json({
        "Trip Service Response Payload": {
          status: 500,
          data: {
            tripId: 0,
          },
          error: [],
        },
      });

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
