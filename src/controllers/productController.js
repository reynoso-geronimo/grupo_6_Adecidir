const fs = require("fs");

const productos = JSON.parse(fs.readFileSync("./productos.json"));

const productDetailController = {
  list: function (req, res) {
    return res.render("products/productList", { productos: productos });
  },

  detail: function (req, res) {
    const producto = productos.find((row) => row.id == req.params.id);
    console.log(producto);
    return res.render("products/productDetail", { producto: producto });
  },
  editform: function (req, res) {
    const producto = productos.find((row) => row.id == req.params.id);
    return res.render("products/productEdit", { producto: producto });
  },
  crearProductoForm: function (req, res) {
    return res.render("products/crearProducto");
  },
};

module.exports = productDetailController;
