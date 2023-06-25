const fs = require("fs");
const path = require("path");
const { validationResult } = require('express-validator')

module.exports = {
    loginForm: function (req, res) {

        return res.render('user/login')

    },
    registerForm:function(req,res) {

        return res.render('user/register')

    }

}

/* VER SI EN UN FUTURO SE LE PUEDE DAR FUNCIONALIDAD PARA ALGO

const usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../database/usuarios.json"), "utf-8"));

const userDetail = {
    loginForm: function (req, res) {
        const usuarios = usuarios.find((row) => row.id == req.params.id);
        return res.render('user/login', { usuarios: usuarios, categorias: categorias });
    },
    registerForm:function(req,res) {
        const usuarios = usuarios.find((row) => row.id == req.params.id);
        return res.render('user/register', { usuarios: usuarios, categorias: categorias });

    }
}

  module.exports = userDetail; */
