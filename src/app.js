const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const home = require('./routes/home.js');
const product = require('./routes/product.js');
const productCart = require('./routes/productCart.js');
const login = require('./routes/login.js');
const register = require('./routes/register.js');

const app = express();

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(methodOverride('_method'))
app.set("view engine", "ejs")
app.use(express.static(path.resolve(__dirname, "./../public")));

app.listen(3000, () => {
  console.log("Servidor Arriba");
});
app.use('/', home)
app.use('/product', product)
app.use('/login', login )
app.use('/register', register)
app.use('/productcart', productCart)




