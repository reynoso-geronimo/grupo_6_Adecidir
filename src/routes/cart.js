const express = require('express');
const router = express.Router()
const cartController = require('../controllers/cartController');
const { userAcess } = require('../middlewares/authMiddleware');

router.get("/",userAcess ,cartController.cart);

module.exports = router