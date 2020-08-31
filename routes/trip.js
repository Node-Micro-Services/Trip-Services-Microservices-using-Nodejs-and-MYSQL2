const path = require('path');

const express = require('express');

const tripController = require('../controller/trip');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', tripController.getAddProduct);

// /admin/products => GET
router.get('/products', tripController.getProducts);

// /admin/add-product => POST
router.post('/add-product', tripController.postAddProduct);

router.get('/edit-product/:productId', tripController.getEditProduct);

router.post('/edit-product', tripController.postEditProduct);

router.post('/delete-product', tripController.postDeleteProduct);

module.exports = router;
