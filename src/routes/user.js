const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController.js');

router.get("/login", userController.loginForm);
router.get("/register", userController.registerForm);

module.exports = router