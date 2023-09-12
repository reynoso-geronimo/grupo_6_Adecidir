const express = require('express');
const router = express.Router()
const apiController = require('../controllers/apiController.js');

// productos
router.get('/products/list/:categoria?', apiController.productList)

//usuarios
router.get('/users/list/', apiController.userList)





module.exports = router;