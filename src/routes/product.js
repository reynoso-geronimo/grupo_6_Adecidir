const express = require('express');
const router = express.Router()
const product = require('../controllers/productController.js');
const logDB = require('../middlewares/logDBMiddleware.js')
const path = require('path');
const multer = require('multer');
const sharp = require('sharp')
const { validarEdit } = require('../middlewares/validaciones.js');
const { adminAcces } = require('../middlewares/authMiddleware.js');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      req.fileValidationError = "Solo formato png, jpg o jpeg estan permitidos";
      return cb(null, false);
    }
  }
  
});
const procesarImagen = async (req, res, next) => {
  if (req.fileValidationError) { return next() }

  const ruta = path.resolve(__dirname, '../../public/images/productos') + "/"

  for (const element of req.files) {
    const nombreImagen = Date.now() + Math.round(Math.random() * 1E9) + path.extname(element.originalname)
    element.filename = nombreImagen
    await sharp(element.buffer).resize({
      width: 300,
      withoutEnlargement: true
    }).toFile(ruta + nombreImagen);
  }
  next();
}


router.get('/list/:categoria?', product.list)

//Creacion de Producto
router.get("/crearProducto", adminAcces, product.crearProductoForm);
router.post("/crearproducto", adminAcces, upload.single("imagenes"), product.save)


router.get("/:id", product.detail);


router.get('/:id/editform/', adminAcces, product.editForm)
router.put('/:id/', adminAcces, upload.array("images"), procesarImagen, validarEdit, logDB.logEdit, (err, req, res, next) => { if (err.code == 'LIMIT_FILE_SIZE') { req.fileValidationError = "Limite 10 MB"; } next() }, product.editItem)

router.delete('/:id/delete', adminAcces, product.deleteProduct)
//!candidato a ser eliminado
//router.get('/ver/borrados', product.listBorrados)
router.put('/:id/alta', adminAcces, product.altaProduct)

module.exports = router;