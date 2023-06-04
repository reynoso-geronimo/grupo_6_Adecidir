const express = require('express');
const router = express.Router()
const product = require('../controllers/productController.js');

router.get("/", product.detail);

module.exports = router