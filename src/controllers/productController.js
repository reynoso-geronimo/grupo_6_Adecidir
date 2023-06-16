const fs = require("fs");

const productos = JSON.parse(fs.readFileSync("./productos.json"));

const productDetailController = {
  list: function (req, res) {
    return res.render("products/productList", { productos: productos });
  },

  detail: function (req, res) {
    const producto = productos.find((row) => row.id == req.params.id);
    
    return res.render("products/productDetail", { producto: producto });
  },
  editForm: function (req, res) {
    const producto = productos.find((row) => row.id == req.params.id);
    return res.render("products/productEdit", { producto: producto });
  },
  editItem: function (req, res) {
    const producto = productos.find((row) => row.id == req.params.id);
    console.log(req.body)
    
    producto.nombre = req.body.name
    producto.precio- req.body.price
    producto.categoria= req.body.category
    producto.talles = req.body.size[0]
    producto.tallem = req.body.size[1]
    producto.tallel = req.body.size[2]
    producto.tallexl = req.body.size[3]
    producto.tallexxl = req.body.size[4]
    if (req.body.desc!="") {
      producto.descripcion= req.body.desc
   }
   

  },
  crearProductoForm: function (req, res) {
    return res.render("products/crearProducto");
  },
};

module.exports = productDetailController;
