const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const home = require('./routes/home.js');
const product = require('./routes/product.js');
const user = require('./routes/user.js');
const api = require('./routes/apiRoutes.js')
const session = require("express-session");
const cookie = require("cookie-parser");
const cookieUsuario = require("./middlewares/cookieMiddleware.js");
const { isLogged } = require("./middlewares/authMiddleware.js")

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
	access_token: process.env.PROD_ACCESS_TOKEN,
});

const port = 3006


const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))

app.set("view engine", "ejs")
app.set('views', path.resolve(__dirname, '../views'))
app.use(express.static(path.resolve(__dirname, "./../public")));

app.use(session({
	secret: "nuestro secreto",
	resave: false,
	saveUninitialized: false
}))

app.use(cookie());
app.use(cookieUsuario);
app.use(isLogged)
app.listen(port, () => {
	console.log(`Servidor corriendo en el puerto ${port}`);
});

app.use(home)
app.use('/product', product)
app.use('/user', user)
app.use('/api', api)

//MERCADOPAGO

app.post("/create_preference", (req, res) => {

	console.log(req.body)

	let preference = {
		metadata:req.body.metadata,
		items: [
			{	
				
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
				
			}
		],
		
		back_urls: {
			"success": `http://localhost:${port}/feedback`,
			"failure": `http://localhost:${port}/feedback`,
			"pending": ``
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			console.log(response)
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});

app.get('/feedback', function (req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});

app.post('/webhook', (req, res) => {

	const data = req.body;
	console.log(data)
	const url = `https://api.mercadopago.com/vi1/payments/${data.id}`
	console.log(url)
	res.sendStatus(200)
})

// FIN MERCADOPAGO



app.use((req, res, next) => {
	res.status(404).sendFile(path.resolve(__dirname, '../public/images/cumbia-404.jpg'))
})

