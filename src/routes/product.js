const express = require('express');
const router = express.Router()
const product = require('../controllers/productController.js');

router.get("/", product.detail);

// router.patch('/:id', product.edit)
// router.delete('/:id',product.delete)

module.exports = router