const express = require('express');
const router = express.Router()
const apiController = require('../controllers/apiController.js');


//usuarios
router.get('/users/', apiController.userList)
router.get('/users/:id', apiController.userDetail)

// products
router.get('/products/',apiController.searchAllproductsAndQuantities)
router.get('/products/:id',apiController.searchProduct)

router.get('/tickets/', apiController.ticketList)
router.get('/tickets2/', apiController.ticketList2)



module.exports = router;