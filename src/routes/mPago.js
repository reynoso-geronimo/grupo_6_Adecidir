const express = require('express');
const router = express.Router()
const mpController = require('../controllers/mpController.js');
//MERCADOPAGO
// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
    access_token: process.env.PROD_ACCESS_TOKEN,
});


router.post("/create_preference", mpController.createPreference);

router.get('/feedback', mpController.feedback);

router.post('/webhook', mpController.webhook)

// FIN MERCADOPAGO

module.exports = router