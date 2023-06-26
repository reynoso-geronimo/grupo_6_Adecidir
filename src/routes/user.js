const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController.js');
const {logged} = require('../middlewares/authMiddleware.js')

router.get("/login",logged ,userController.loginForm);
router.post("/login", userController.processLogin);
router.get("/register",logged ,userController.registerForm);
router.post("/register", userController.processRegister);
router.get("/logout", userController.logout);

module.exports = router