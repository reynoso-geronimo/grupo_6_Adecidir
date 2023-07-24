const express = require('express');
const router = express.Router()
const product = require('../controllers/productController.js');
const logDB = require('../middlewares/logDBMiddleware.js')
const path = require('path');
const multer = require('multer');
const { validarEdit,validarImagenSize } = require('../middlewares/validaciones.js');
const {adminAcces} = require('../middlewares/authMiddleware.js');




const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, path.resolve(__dirname, '../../public/images/productos'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9)

    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits:{fileSize:1024*1024*10},
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true);
    } else {

      req.fileValidationError = "Solo imagenes estan permitidas";
      return cb(null, false);

    }
  }
})



router.get('/list/:categoria?', product.list)

//Creacion de Producto
router.get("/crearProducto",adminAcces ,product.crearProductoForm);
router.post("/crearproducto",adminAcces,upload.array("imagenes"), product.save)


router.get("/:id", product.detail);


router.get('/:id/editform/', adminAcces,product.editForm)
router.put('/:id/', adminAcces,upload.array("images"),validarImagenSize,validarEdit, logDB.logEdit,product.editItem)

router.delete('/:id/delete',adminAcces,product.deleteProduct)

router.put('/:id/alta',adminAcces,product.altaProduct)

module.exports = router;
