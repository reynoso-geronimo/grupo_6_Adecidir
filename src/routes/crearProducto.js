const express = require('express');
const router = express.Router()
const crearProducto = require('../controllers/crearProducto.js');

router.get("/", crearProducto.crearProductoForm);

module.exports = router
