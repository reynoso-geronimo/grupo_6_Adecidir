const express = require('express');
const router = express.Router()
const path = require('path');
const multer = require('multer')
const validateAvatar = require('../middlewares/avatarMiddleware.js')
const {logged, userAcess,adminAcces} = require('../middlewares/authMiddleware.js');
const userController = require('../controllers/userController.js');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/images/avatar'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9)

    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {

      req.fileValidationError = "Solo formato png, jpg o jpeg estan permitidos";
      return cb(null, false, req.fileValidationError);

    }
  }
})


// login
router.get("/login", logged,userController.loginForm);
router.get("/logout",userAcess,userController.logout);
router.post("/login", logged,userController.loginProcess);

// register
router.get("/register", logged,userController.registerForm);
router.post("/register", logged,upload.single('avatar'),validateAvatar,userController.processRegister);


router.get("/profile", userAcess,userController.perfil);
router.get("/admin",adminAcces, userController.adminPanel);
router.get("/cart",userAcess ,userController.cart);
//TODO ruta agregar al carrito
//router.post("/cart",userAcess ,userController.subirProdCarrito);

module.exports = router