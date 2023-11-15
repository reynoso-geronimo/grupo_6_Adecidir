const db = require("../database/models");

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: process.env.PROD_ACCESS_TOKEN,
});
const port = 3006;

const mpController = {
  createPreference: (req, res) => {
    let preference = {
      metadata: req.body.metadata,
      //notification_url:"https://62cb-190-183-21-152.ngrok-free.app/webhook",
      items: [
        {
          title: req.body.description,
          unit_price: Number(req.body.price),
          quantity: Number(req.body.quantity),
        },
      ],

      back_urls: {
        success: `/`,
        failure: `/`,
        pending: `/`,
      },
      auto_return: "approved",
    };

    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        res.json({
          id: response.body.id,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  feedback: function (req, res) {
    res.json({
      Payment: req.query.payment_id,
      Status: req.query.status,
      MerchantOrder: req.query.merchant_order_id,
    });
  },
  webhook: async (req, res) => {

    try {
      const { type, data } = req.body;

      if (type == "payment") {
        const url = `https://api.mercadopago.com/v1/payments/${data.id}`;

        const response = await fetch(url, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PROD_ACCESS_TOKEN}`,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          // Ahora responseData contiene los datos en formato JSON de la respuesta del servidor
          console.log(responseData.metadata);
          console.log(responseData.status);

          const ticket = await db.Tickets.findByPk(responseData.metadata.id_ticket);
          ticket.estado = "Pago"
          ticket.save()
          console.log(ticket)
        }


      } else {
        // Manejar errores si la respuesta no fue exitosa
        console.error(
          "Error en la solicitud:",
          response.status,
          response.statusText
        );
      } res.sendStatus(200);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = mpController;
