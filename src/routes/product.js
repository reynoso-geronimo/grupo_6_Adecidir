const express = require('express');
const router = express.Router()
const product = require('../controllers/productController.js');
const logDB = require('../middlewares/logDBMiddleware.js')
const {uploadImgProducto} = require('../middlewares/fileUploadMiddleware.js')
const { validarEditProduct,validarImagenSize } = require('../middlewares/validaciones.js');
const {adminAcces} = require('../middlewares/authMiddleware.js');

// List
router.get('/list/:categoria?', product.list)

//Creacion de Producto

router.get("/crearProducto", adminAcces, product.crearProductoForm);
router.post("/crearproducto", adminAcces, uploadImgProducto.array("imagenes", 5), product.save);

//Detalle
router.get("/:id", product.detail);

//Edit 

router.get('/:id/editform/', adminAcces,product.editForm)
router.put('/:id/', adminAcces,uploadImgProducto.array('images', 5),validarImagenSize,validarEditProduct ,logDB.logEdit,product.editItem)


// Delete (no funca)
router.delete('/:id/delete', product.delete);

router.put('/:id/alta',adminAcces,product.altaProduct)

module.exports = router;
