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
  },searchAllproducsAndQuantities: async function (req, res) {
    let response={};
    try{
      const [productos,categorias] = await Promise.all([Productos.findAll({include:[{association : "Categorias"}]}),Categorias.findAll({include:[{association : "Productos"}]}),])
      response.count=productos.length;
      response.countByCategory = {};
      categorias.forEach((categoria) => {
        response.countByCategory[categoria.nombre]= categoria.Productos.length        
      })
      response.products= productos.map((producto)=>{return{
        id:producto.id,
        name:producto.nombre,
        description:producto.descripcion,
        category:producto.Categorias,
        detail: '/api/products/'+producto.id
      }})
      return res.json(response)
    }catch(e){
      response.msg="Hubo un error"+e
      return res.json(response)
    }
  }
};

module.exports = apiController;
