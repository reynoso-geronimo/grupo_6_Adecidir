const express = require('express');
const router = express.Router()
const path = require('path');
const multer = require('multer')
const validateAvatar = require('../middlewares/avatarMiddleware.js')
const {logged, userAcess,adminAcces} = require('../middlewares/authMiddleware.js');
const {uploadImgAvatar} = require('../middlewares/fileUploadMiddleware.js')
const userController = require('../controllers/userController.js');






// login
router.get("/login", logged,userController.loginForm);
router.get("/logout",userAcess,userController.logout);
router.post("/login", logged,userController.loginProcess);

// register
router.get("/register", logged,userController.registerForm);
router.post("/register", logged,uploadImgAvatar.single('avatar'),validateAvatar,userController.processRegister);


router.get("/profile", userAcess,userController.perfil);
router.get("/profile/edit", userAcess,userController.perfilEdit);
router.get("/profile/edit/password", userAcess,userController.perfilEditPassword);
router.get("/admin",adminAcces, userController.adminPanel);
router.get("/cart",userAcess ,userController.cart);
//TODO ruta agregar al carrito
//router.post("/cart",userAcess ,userController.subirProdCarrito);

module.exports = router