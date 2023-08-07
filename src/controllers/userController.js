const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const User = require("../models/User.js");
const db = require('../database/models')

module.exports = {
  loginForm: function (req, res) {
    return res.render("user/login");
  },

  loginProcess: async function (req, res) {
    const usuario = User.findByField('email', req.body.email)
    if (!usuario) return res.render("user/login", { errors: { datosIncorrectos: { msg: "Datos Incorrectos" } } });
    try {
      if (await bcryptjs.compare(req.body.password, usuario.clave)) {
        delete usuario.clave;
        req.session.usuarioLogeado = usuario;
        if (req.body.cookie) res.cookie("recordarUsuario", req.body.email, { maxAge: 1000 * 60 * 60 *72});

        return res.redirect("/");

      } else {
        return res.render("user/login", { errors: { datosIncorrectos: { msg: "Datos Incorrectos" } } });
      }
    } catch (error) {
      console.log(error);
      return res.render("user/login", {
        errors: { datosIncorrectos: { msg: "Ocurrio un Error" } }
      });
    }
  },

  logout: function (req, res) {
    req.session.destroy();

    res.clearCookie("recordarUsuario");
    res.redirect("/");
  },

  registerForm: function (req, res) {
    return res.render("user/register");
  },
  // Registro
  processRegister: async function (req, res) {
    const userInDb = User.findByField("email", req.body.email);
    // para no usar el mismo email, despues voy a hacer las validaciones asi sale el mensaje y todo
    if (userInDb) {
      console.log(req.body);
      return res.render("user/register", {
        oldData: req.body,
        errors: { email: { msg: "este email ya esta en uso" } },
      });
    }

    const userToCreate = {
      ...req.body,
      clave: await bcryptjs.hash(req.body.clave, 10),
    };
    userToCreate.categoria = "customer";
    userToCreate.avatar = req.file.filename;
    delete userToCreate.passwordRepeat;
    User.create(userToCreate);

    return res.redirect("login");
  },
  adminPanel: function (req, res) {
    const productos = JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, "../database/productos.json"),"utf-8"));
    return res.render("user/admin", { productos: productos });
  },
  perfil: function (req, res) {
    return res.render("user/profile", { usuario: req.session.usuarioLogeado });
  },
  perfilEdit: function (req, res) {
    return res.render("user/profileEdit", { usuario: req.session.usuarioLogeado });
  },
  perfilEditPassword: function (req, res) {
    return res.render("user/profileEditPassword");
  },
  cart: function (req, res) {
    return res.render("user/cart");
  },
};
