const express = require('express');
const router = express.Router()
const apiController = require('../controllers/apiController.js');


//usuarios
router.get('/users/', apiController.userList)
router.get('/users/:id', apiController.userDetail)

// products
router.get('/products/',apiController.searchAllproducsAndQuantities)





module.exports = router;