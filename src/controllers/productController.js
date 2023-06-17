const fs = require("fs");


const productos = JSON.parse(fs.readFileSync("./productos.json","utf-8")); //esto puede traer problemas posible solucion transformarlo en una funcion y que cada funcion la invoque para siempre estar actualizada

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
    
    producto.nombre = req.body.name
    producto.precio - req.body.price
    producto.categoria = req.body.category
    producto.talles = req.body.size[0]
    producto.tallem = req.body.size[1]
    producto.tallel = req.body.size[2]
    producto.tallexl = req.body.size[3]
    producto.tallexxl = req.body.size[4]

    // al no poder por ahora pasar a la vista por ahora al menos el value al text area, chequeo que esta no venga vacia
    if (req.body.desc != "") {
      producto.descripcion = req.body.desc
    }

    // chequeo en que forma llega la informacion de los checkboxes, quizas un switch seria mejor

    if (req.body.imgDelete&& typeof req.body.imgDelete =="object") {
     
     for (const img of req.body.imgDelete) {
      
      producto.imagenes = producto.imagenes.filter(row => row != img)
     }
     ;
    }else if(req.body.imgDelete&& typeof req.body.imgDelete =="string"){
      producto.imagenes = producto.imagenes.filter(row => row != req.body.imgDelete)
    }
    
    fs.writeFileSync("./productos.json",JSON.stringify(productos ,null,2))


    return res.redirect("/product/" + req.params.id +"/editform")
  },
  editImages:(req,res) => { 
      console.log(req.file);
      const producto = productos.find((row) => row.id == req.params.id);
      producto.imagenes = [...producto.imagenes,"/images/productos/"+req.file.filename]
      
      fs.writeFileSync("./productos.json",JSON.stringify(productos ,null,2))

      return res.redirect("/product/" + req.params.id +"/editform")
   },

  crearProductoForm: function (req, res) {
    return res.render("products/crearProducto");
  },
};

module.exports = productDetailController;
