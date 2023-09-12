const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const db = require("../database/models");
const { Op } = require("sequelize");

const Categorias = db.Categorias;
const Productos = db.Productos;
const Imagenes = db.Imagenes;

const apiController = {
  productList: async (req, res) => {
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

      return res.json({ data: productos });
    } catch (error) {
      console.log(error);
    }
  },
  userList: async function (req, res) {
    try {
      const usuarios = await db.Usuarios.findAll({});

      let response = {
        users: usuarios.map(usuario => {
          return {
            id: usuario.id,
            name: usuario.nombre,
            email: usuario.email,
            deatail: "",
          };
        }),
        count: usuarios.length,
      };

      return res.json(response);
    } catch (error) {}
  },
};

module.exports = apiController;
