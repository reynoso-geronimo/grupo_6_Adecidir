const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.resolve(__dirname, "./public")));

app.listen(3000, () => {
  console.log("Servidor Arriba");
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, `./views/index.html`));
});

app.get("/product", (req, res) => {
  res.sendFile(path.resolve(__dirname, `./views/productDetail.html`));
});

app.get("/productcart", (req, res) => {
  res.sendFile(path.resolve(__dirname, `./views/productCart.html`));
});

app.get("/register", (req, res) => {
  res.sendFile(path.resolve(__dirname, `./views/register.html`));
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, `./views/login.html`));
});

