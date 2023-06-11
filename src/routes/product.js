const express = require('express');
const router = express.Router()
const product = require('../controllers/productController.js');

router.get('/list', product.list)
router.get("/crearProducto", product.crearProductoForm);

router.get("/:id?", product.detail);


router.get('/:id/editform/', product.editform)
// router.patch('/:id/edit', product.edit)
// router.delete('/:id/delete',product.delete)


module.exports = router;
