const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const db = require("../database/models");
const { Op } = require("sequelize");

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
          include: [{ model: Imagenes, as: "Imagenes" }],
        });
      } else {
        productos = await Productos.findAll({
          include: [{ model: Imagenes, as: "Imagenes" }],
        });
      }

      res.render("products/productList", { productos });
    } catch (error) {
      console.log(error);
      // aca se le puede agregar algo para el error
    }
  },

  detail: async (req, res) => {
    try {
      const producto = await Productos.findByPk(req.params.id, {
        include: [
          {
            model: Imagenes,
            as: "Imagenes",
          },
        ],
      });

      if (!producto) {
        return res.status(404).send("Producto no encontrado");
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
      const [producto, categorias] = await Promise.all([
        Productos.findByPk(req.params.id, {
          include: [{ model: db.Imagenes, as: "Imagenes" }],
          paranoid: false,
        }),
        Categorias.findAll(),
      ]);

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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        {
          const [producto, categorias] = await Promise.all([
            Productos.findByPk(req.params.id, {
              include: [{ model: db.Imagenes, as: "Imagenes" }],
              paranoid: false,
            }),
            Categorias.findAll(),
          ]);
          const old = { ...req.body }
          console.log(producto.Imagenes)
          old.Imagenes=producto.Imagenes
          old.id=producto.id
         
          if (req.files.length > 0) {
            const imagesToDelete = req.files
            ? req.files.map(file => file.filename)
            : [];
            for (const imageNombre of imagesToDelete) {
              fs.unlinkSync(
                path.resolve(
                  __dirname,
                  "../../public/images/productos/" + imageNombre
                )
              );
            }
          }
    
          
          return res.render("products/productEdit", { producto: old, errors: errors.mapped() , categorias: categorias })
        }
       
       // return res.status(400).json({ errors: errors.array() });
      }

      const productId = req.params.id;
      const updatedProduct = req.body;

      // aca accedo al producto por su id
      const producto = await Productos.findByPk(productId);
      const imageFilenames = req.files
        ? req.files.map(file => file.filename)
        : [];

      if (req.body.talleUnico >= 1) {
        updatedProduct.talleS = 0;
        updatedProduct.talleM = 0;
        updatedProduct.talleL = 0;
        updatedProduct.talleXL = 0;
        updatedProduct.talleXXL = 0;
      } else {
        if (
          req.body.talleS >= 1 ||
          req.body.talleM >= 1 ||
          req.body.talleL >= 1 ||
          req.body.talleXl >= 1 ||
          req.body.talleXXl >= 1
        ) {
          updatedProduct.talleUnico = 0;
        }
      }

      /* if (!producto) {
         aca se le puede agregar algo para el error
       } */

      // esto todavia no funciona  bien pero se arregla
      if (req.body.imgDelete) {
        const imagesToDelete = Array.isArray(req.body.imgDelete)
          ? req.body.imgDelete
          : [req.body.imgDelete];

        for (const imageNombre of imagesToDelete) {
          await Imagenes.destroy({ where: { nombre: imageNombre } });
          fs.unlinkSync(
            path.resolve(
              __dirname,
              "../../public/images/productos/" + imageNombre
            )
          );
        }
      }

      if (imageFilenames.length > 0) {
        const imagenes = imageFilenames.map(filename => ({
          nombre: filename,
          id_producto: producto.id,
        }));
        await Imagenes.bulkCreate(imagenes);
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
      return res.render("products/crearProducto", { categorias: categorias });
    } catch (error) {
      console.log(error);
      // aca se le puede agregar algo para el error
    }
  },
  save: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const imagesToDelete = req.files
        ? req.files.map(file => file.filename)
        : [];
        for (const imageNombre of imagesToDelete) {
          fs.unlinkSync(
            path.resolve(
              __dirname,
              "../../public/images/productos/" + imageNombre
            )
          );
        }

        return res.status(400).json({ errors: errors.array() });
      }

      const imageFilenames = req.files
        ? req.files.map(file => file.filename)
        : [];

      const talleS = req.body.talles || 0;
      const talleM = req.body.tallem || 0;
      const talleL = req.body.tallel || 0;
      const talleXL = req.body.tallexl || 0;
      const talleXXL = req.body.tallexxl || 0;
      const talleUnico = req.body.talleUnico || 0;

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
        talleUnico,
      });

      if (imageFilenames.length > 0) {
        const imagenes = imageFilenames.map(filename => ({
          nombre: filename,
          id_producto: producto.id,
        }));
        await Imagenes.bulkCreate(imagenes);
      }

      res.redirect(`/product/${producto.id}`);
    } catch (error) {
      console.log(error);
      // aca se le puede agregar algo para el error
    }
  },
  // no funciona... por ahora
  delete: async (req, res) => {
    try {
      await Productos.destroy({
        where: {
          id: req.params.id,
        },
      });

      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },

  altaProduct: async function (req, res) {
    try {
      await Productos.restore({
        where: {
          id: req.params.id,
        },
      });

      return res.redirect(req.get("referer"));
    } catch (error) {
      console.log(error);
    }
  },
  cartApi: async function (req, res) {
    try {
      const productos = req.body;

      const busquedas = productos.map(async producto => {
        const productoEnDB = await db.Productos.findOne({
          where: { id: producto.id },
          include: [{ model: Imagenes, as: "Imagenes" }],
        });

        const productoEnStock = {
          imagen: productoEnDB.Imagenes[0].nombre,
          nombre: productoEnDB.nombre,
          precio: productoEnDB.precio,
          talle: producto.talle,
          cantidad: producto.cantidad,
        };
        return productoEnStock;
      });
      const resultado = await Promise.all(busquedas);

      return res.json(resultado);
    } catch (error) {
      return res.status(500).json({ error: "Error al procesar la solicitud" });
    }
  },
  searchProducts: async function (req, res) {
    try {
      const { keyword } = req.body;
      console.log(keyword);
  
      const products = await Productos.findAll({
        where: {
          [Op.or]: [
            { nombre: { [Op.like]: `%${keyword}%` } },
            { descripcion: { [Op.like]: `%${keyword}%` } },
            {'$Categorias.nombre$': { [Op.like]: `%${keyword}%` },},
          ],
        },
        include: [{model: Categorias,as: "Categorias"},{ model: Imagenes, as: "Imagenes" }]
      });
  
      res.status(200).json({ products });
    } catch (error) {
      console.error("Error en la búsqueda", error);
      res.status(500).json({ error: "Ocurrió un error, inténtalo más tarde" });
    }
  }
};

module.exports = productDetailController;
