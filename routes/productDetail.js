const express = require('express');
const router = express.Router()
const productDetailController = require('../controllers/productDetailController.js');

router.get("/", productDetailController.detail);

module.exports = router