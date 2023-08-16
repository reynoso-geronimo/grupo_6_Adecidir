const fs = require("fs");
const path = require("path");
const { validationResult } = require('express-validator')
const db = require('../database/models')

const Categorias = db.Categorias; 
const Productos = db.Productos;
const Imagenes = db.Imagenes; 


const productDetailController = {
  list: async (req, res) => {
    try {
      const categoriaId = req.params.categoria;
      let productos = [];
  
      if (categoriaId) {
        productos = await Productos.findAll({
          where: { id_categoria: categoriaId },
          include: [{ model: Imagenes, as: "Imagenes" }]
        });
      } else {
        productos = await Productos.findAll({
          include: [{ model: Imagenes, as: "Imagenes" }]
        });
      }
  
      res.render("products/productList", { productos });
    } catch (error) {
      console.log(error);
      // aca se le puede agregar algo para el error
    }
  },


detail : async (req, res) => {
  try {
      const producto = await Productos.findByPk(req.params.id, {
          include: [{
              model: Imagenes,
              as: 'Imagenes'
          }]
      });

      if (!producto) {
          return res.status(404).send('Producto no encontrado');
      }

      res.render("products/productDetail", { producto });
  } catch (error) {
      console.log(error);
      // aca se le puede agregar algo para el error
  }
},
//EDICION DE PRODUCTO
  editForm: async function (req, res) {
    try {
      const producto = await Productos.findByPk(req.params.id);
      const categorias = await Categorias.findAll();
      
      /* if (!producto) {
        aca se le puede agregar algo para el error
      } */
      
      return res.render("products/productEdit", { producto, categorias });
    } catch (error) {
      console.log(error);
      // aca se le puede agregar algo para el error
    }
  },

  editItem: async function (req, res) {
    try {
      const productId = req.params.id;
      const updatedProduct = req.body;
  
      
      // aca accedo al producto por su id
      const producto = await Productos.findByPk(productId);
  
     /* if (!producto) {
        aca se le puede agregar algo para el error
      } */
  
      // esto todavia no funciona  bien pero se arregla
      if (req.body.imgDelete) {
        const imagesToDelete = Array.isArray(req.body.imgDelete)
          ? req.body.imgDelete
          : [req.body.imgDelete];
  
        for (const imageId of imagesToDelete) {
          await Imagenes.destroy({ where: { id: imageId } });
        }
      }
  
      // esto todavia no funciona  bien pero se arregla
      if (req.files && req.files.images) {
        const images = Array.isArray(req.files.images)
          ? req.files.images
          : [req.files.images];
  
        for (const image of images) {
          await Imagenes.create({ nombre: image.filename, id_producto: producto.id });
        }
      }
  
      // update
      await producto.update(updatedProduct);
  
      return res.redirect(`/product/${producto.id}`); // para que el redirect te mande al producto 
    } catch (error) {
      console.log(error);
      // aca se le puede agregar algo para el error
    }
  },
  
  
// CREACION DE PRODUCTO
  crearProductoForm: async function (req, res) {
    try {
      const categorias = await Categorias.findAll();
      return res.render("products/crearProducto", { categorias : categorias });
    } catch (error) {
      console.log(error);
      // aca se le puede agregar algo para el error
    }
  },
  save: async (req, res) => {
    try {
      const imageFilenames = req.files ? req.files.map(file => file.filename) : [];
  
      const talleS = req.body.talles || 0;
      const talleM = req.body.tallem || 0;
      const talleL = req.body.tallel || 0;
      const talleXL = req.body.tallexl || 0;
      const talleXXL = req.body.tallexxl || 0;
  
      const { nombre, precio, id_categoria, descripcion } = req.body;
  
      const producto = await Productos.create({
        nombre,
        precio,
        id_categoria,
        descripcion,
        talleS,
        talleM,
        talleL,
        talleXL,
        talleXXL,
        image: imageFilenames.join(', ')
      });
        

  
      if (imageFilenames.length > 0) {
        const imagenes = imageFilenames.map(filename => ({
          nombre: filename,
          id_producto: producto.id
        }));
        await Imagenes.bulkCreate(imagenes)
      }
  
      res.redirect('/')
    } catch (error) {
      console.log(error)
      // aca se le puede agregar algo para el error
    }
  },
// no funciona... por ahora 
 delete: async (req, res) => {
  try {
    const productoId = req.params.id;

    const producto = await Productos.findByPk(productoId);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await producto.destroy();

    res.redirect('/');
  } catch (error) {
    console.log(error);
    }
},

// y esto no lo vi por ahora
  altaProduct : function (req,res) {
    const productoEncontrado = productos.find((row) => row.id == req.params.id);
    productoEncontrado.borrado = false
    fs.writeFileSync(path.resolve(__dirname, "../database/productos.json"), JSON.stringify(productos, null, 2))
    return res.redirect(req.get('referer')) },

};

module.exports = productDetailController;
