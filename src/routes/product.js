const express = require('express');
const router = express.Router()
const product = require('../controllers/productController.js');
const logDB = require('../middlewares/logDBMiddleware.js')
const {uploadImgProducto} = require('../middlewares/fileUploadMiddleware.js')
const { validarEdit,validarImagenSize } = require('../middlewares/validaciones.js');
const {adminAcces} = require('../middlewares/authMiddleware.js');


router.get('/list/:categoria?', product.list)

//Creacion de Producto
router.get("/crearProducto",adminAcces ,product.crearProductoForm);
router.post("/crearproducto",adminAcces,uploadImgProducto.array("imagenes"), product.save)


router.get("/:id", product.detail);


router.get('/:id/editform/', adminAcces,product.editForm)
router.put('/:id/', adminAcces,uploadImgProducto.array("images"),validarImagenSize,validarEdit, logDB.logEdit,product.editItem)

router.delete('/:id/delete',adminAcces,product.deleteProduct)

router.put('/:id/alta',adminAcces,product.altaProduct)

module.exports = router;
