const express = require('express');
const router = express.Router()
const product = require('../controllers/productController.js');
const logDB = require('../middlewares/logDBMiddleware.js')
const path = require('path');
const multer = require('multer');
const { validarEdit } = require('../middlewares/validaciones.js');
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
  limits:{fileSize:1024},
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" ) {
      cb(null, true);
    } else {

      req.fileValidationError = "Solo formato png, jpg o jpeg estan permitidos";
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
router.put('/:id/', adminAcces,upload.array("images"), validarEdit, logDB.logEdit, (err,req,res,next)=>{if(err.code== 'LIMIT_FILE_SIZE'){req.fileValidationError = "Limite 10 MB";}next()},product.editItem)

router.delete('/:id/delete',adminAcces,product.deleteProduct)
//!candidato a ser eliminado
//router.get('/ver/borrados', product.listBorrados)
router.put('/:id/alta',adminAcces,product.altaProduct)

module.exports = router;
