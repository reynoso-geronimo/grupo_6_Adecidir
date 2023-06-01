const express = require('express');
const router = express.Router()
const homeController = require('../controllers/homeController.js');

router.get("/", homeController.list);

module.exports = router