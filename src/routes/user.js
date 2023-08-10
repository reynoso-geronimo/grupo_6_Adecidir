const express = require('express');
const router = express.Router()
const validateAvatar = require('../middlewares/avatarMiddleware.js')
const {logged, userAcess,adminAcces} = require('../middlewares/authMiddleware.js');
const {uploadImgAvatar} = require('../middlewares/fileUploadMiddleware.js')
const userController = require('../controllers/userController.js');






// login
router.get("/login", logged,userController.loginForm);
router.get("/logout",userAcess,userController.logout);
router.post("/login", logged,userController.loginProcess);
router.get("/passwordreset", logged,userController.pwResetForm);
router.post("/passwordreset", logged,userController.pwResetProcess);

// register
router.get("/register", logged,userController.registerForm);
router.post("/register", logged,uploadImgAvatar.single('avatar'),validateAvatar,userController.processRegister);


router.get("/profile", userAcess,userController.perfil);
router.get("/profile/edit", userAcess,userController.perfilEdit);
router.post("/profile/edit/", userAcess,uploadImgAvatar.single('avatar'),userController.processEdit);
router.get("/profile/edit/password", userAcess,userController.perfilEditPassword);
router.post("/profile/edit/password", userAcess,userController.processEditPassword);
router.get("/admin",adminAcces, userController.adminPanel);
router.get("/cart",userAcess ,userController.cart);
//TODO ruta agregar al carrito
//router.post("/cart",userAcess ,userController.subirProdCarrito);

module.exports = router