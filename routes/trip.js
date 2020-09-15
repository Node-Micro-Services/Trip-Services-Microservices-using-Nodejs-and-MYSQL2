const path = require("path");

const express = require("express");

const tripController = require("../controller/trip");

const router = express.Router();

router.get("/user/:id", tripController.getProductParam);
router.get('/:id', tripController.getProduct);
router.post("/", tripController.postAddProduct);
router.patch("/", tripController.patchProduct);
router.delete("/", tripController.deleteProduct);


module.exports = router;
