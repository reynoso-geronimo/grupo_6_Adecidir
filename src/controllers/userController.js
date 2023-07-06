const fs = require("fs");
const path = require("path");
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const User = require('../models/User.js')

const usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../database/usuarios.json"), "utf-8"));



module.exports = {
    loginForm: function (req, res) {

        return res.render('user/login')

    },

    loginProcess: function(req, res) {
       const usuario = usuarios.find((row) => row.email == req.body.email)
       if (usuario) {
          if (usuario.password == req.body.password){
            delete usuario.password
            req.session.usuarioLogeado = usuario
            if (req.body.cookie){
                res.cookie("recordarUsuario", req.body.email, {maxAge: 1000*60*60})
            }
            return res.redirect("/")
          } else {
            return res.render("user/login", {
                error: {
                    datosIncorrectos : {
                        msg: "Datos Incorrectos :("
                    }
                }
            })
          }
       }else {
        return res.render("user/login", {
            error: {
                datosIncorrectos : {
                    msg: "Datos Incorrectos :("
                }
            }
        })
      }
    },



    registerForm:function(req,res) {

        return res.render('user/register')

    },
    // Registro
    processRegister : function (req, res){
        let userInDb = User.findByField('email', req.body.email)
        // para no usar el mismo email, despues voy a hacer las validaciones asi sale el mensaje y todo
        if(userInDb){
            return res.render('user/register',
            { errors : {
                email : {
                    msg: 'este email ya esta en uso'
                },
                oldData : req.body

            }
              
            });        
        }

        let userToCreate = { 
            ...req.body,
            clave: bcryptjs.hashSync(req.body.clave, 10),
            
        }
        userToCreate.categoria = "customer";
        userToCreate.avatar = req.file.filename
        delete userToCreate.passwordRepeat
        let userCreated = User.create(userToCreate)

        return res.redirect('login')
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
