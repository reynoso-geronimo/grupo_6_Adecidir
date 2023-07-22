const express = require('express');
const router = express.Router()
const product = require('../controllers/productController.js');
const logDB = require('../middlewares/logDBMiddleware.js')
const { validarEdit } = require('../middlewares/validaciones.js');
const { adminAcces } = require('../middlewares/authMiddleware.js');
const {upload, procesarImagen,multerErrors}=require('../middlewares/fileUploadMiddleware.js')

router.get('/list/:categoria?', product.list)

//Creacion de Producto
router.get("/crearProducto", adminAcces, product.crearProductoForm);
router.post("/crearproducto", adminAcces, upload.single("imagenes"), product.save)


router.get("/:id", product.detail);


router.get('/:id/editform/', adminAcces, product.editForm)
router.put('/:id/', adminAcces, upload.array("images"), procesarImagen,multerErrors, validarEdit, logDB.logEdit, product.editItem)

router.delete('/:id/delete', adminAcces, product.deleteProduct)
//!candidato a ser eliminado
//router.get('/ver/borrados', product.listBorrados)
router.put('/:id/alta', adminAcces, product.altaProduct)

module.exports = router;