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
        count: usuarios.length,
        users: usuarios.map(usuario => {
          return {
            id: usuario.id,
            name: usuario.nombre,
            email: usuario.email,
            detail: "/api/users/"+ usuario.id,
          };
        }),
      };

      return res.json(response);
    } catch (error) {}
  },
  userDetail : async function (req, res){
    let response = {}
    try {
      const findUser = await db.Usuarios.findByPk(req.params.id,  {attributes:{exclude: ["password", "categoria",]}})
      response.data= findUser
      response.data.avatar =`/public/images/avatar${findUser.avatar}`
      return res.json(response)
    }
    catch (error) {
      console.log(error)
    }
  }
};

module.exports = apiController;
