const express = require('express');
const router = express.Router()
const validateAvatar = require('../middlewares/avatarMiddleware.js')
const { validarRegistro,validarLogin,validarEditUsuario,validarImagenSize } = require('../middlewares/validaciones.js');
const {logged, userAcess,adminAcces, superAdminAcces} = require('../middlewares/authMiddleware.js');
const {uploadImgAvatar} = require('../middlewares/fileUploadMiddleware.js')
const userController = require('../controllers/userController.js');






// login
router.get("/login", logged,userController.loginForm);
router.get("/logout",userAcess,userController.logout);
router.post("/login", logged,validarLogin,userController.loginProcess);
router.get("/passwordreset", logged,userController.pwReset);
router.post("/passwordreset", logged,userController.pwResetCreateLink);
router.get("/password-reset/:token", logged, userController.passwordResetForm);
router.post("/password-reset/:token", logged, userController.passwordResetProcess);
// register
router.get("/register", logged,userController.registerForm);
router.post("/register", logged,uploadImgAvatar.single('avatar'),validarImagenSize,validarRegistro,validateAvatar,userController.processRegister);


router.get("/profile", userAcess,userController.perfil);
router.get("/profile/edit", userAcess,userController.perfilEdit);
router.post("/profile/edit/", userAcess,uploadImgAvatar.single('avatar'),validarImagenSize,validarEditUsuario,userController.processEdit);
router.get("/profile/edit/password", userAcess,userController.perfilEditPassword);
router.post("/profile/edit/password", userAcess,userController.processEditPassword);
router.get("/admin",adminAcces, userController.adminPanel);
router.get("/adminUsers",superAdminAcces, userController.adminUsers);
router.get("/editarRol",superAdminAcces, userController.editarRol);
router.post("/editarRol",superAdminAcces, userController.editarCategoria);
router.get("/cart",userController.cart);



//TODO ruta de ticket

router.post("/api/ticket", userController.apiTikcketProcess)
router.get("/ticket/:id", userController.ticketCheckout)

module.exports = router
