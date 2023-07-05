const fs = require("fs");
const path = require("path");
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const User = require('../models/User.js')


module.exports = {
    loginForm: function (req, res) {

        return res.render('user/login')

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
    },
    adminPanel: function (req,res){
        const productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../database/productos.json"), "utf-8"))
            return res.render('user/admin',{productos:productos})
    
    }

}

