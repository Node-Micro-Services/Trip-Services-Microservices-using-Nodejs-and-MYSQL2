const path = require("path");

const express = require("express");

const tripController = require("../controller/trip");

const router = express.Router();

// /trip => GET
// router.get('/add-product', tripController.getAddProduct);

// /admin/products => GET
// router.get('/products', tripController.getProducts);

// /trip/ => POST
router.get('/:id', tripController.getProductParam);
router.get("/", tripController.getProduct);
router.post("/", tripController.postAddProduct);
router.patch("/", tripController.patchProduct);
router.delete("/", tripController.deleteProduct);


module.exports = router;
