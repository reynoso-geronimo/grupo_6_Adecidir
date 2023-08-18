const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const db = require('../database/models')
const { sequelize } = require("../database/models");
const { enviarEmail } = require('../helpers/email.js');
const  jwt  = require("jsonwebtoken");

module.exports = {
  loginForm: function (req, res) {
    return res.render("user/login");
  },

  loginProcess: async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.render("user/login", { errors: errors.mapped()})

    }
    const usuario = await db.Usuarios.findOne({ where: { email: req.body.email } })
    if (!usuario) return res.render("user/login", { errors: { datosIncorrectos: { msg: "Datos Incorrectos" } } });
    try {
      if (await bcryptjs.compare(req.body.password, usuario.password)) {
        delete usuario.clave;
        req.session.usuarioLogeado = usuario;
        if (req.body.cookie) res.cookie("recordarUsuario", usuario.id, { maxAge: 1000 * 60 * 60 * 72 });

        return res.redirect("/");

      } else {
        return res.render("user/login", { errors: { datosIncorrectos: { msg: "Datos Incorrectos" } } });
      }
    } catch (error) {
      console.log(error);
      return res.render("user/login", {
        errors: { datosIncorrectos: { msg: "Ocurrio un Error" } }
      });
    };
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
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.render("user/register", { errors: errors.mapped()})

    }

    const userInDb = await db.Usuarios.findOne({ where: { email: req.body.email } })
    if (userInDb) {

      return res.render("user/register", {
        oldData: req.body,
        errors: { email: { msg: "este email ya esta en uso" } },
      });
    };
    const userToCreate = {
      email: req.body.email,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      password: req.body.clave,
      avatar: req.file.filename,
      categoria: "customer"
    };
    const t = await sequelize.transaction()
    try {
      await db.Usuarios.create(userToCreate, { transaction: t });
      await t.commit();;
    } catch (error) {
      console.log(error);
      console.log('ocurrio un error');
      if (req.file) fs.unlinkSync(path.resolve(__dirname, '../../public/images/avatar/' + req.file.filename))
      await t.rollback();
    }
    return res.redirect("login");
  },
  adminPanel:async  function (req, res) {
    const productos = await db.Productos.findAll({
      include: [{ model: db.Imagenes, as: "Imagenes" }],
      paranoid: false
    });
    return res.render("user/admin", { productos: productos });
  },
  perfil: function (req, res) {
    return res.render("user/profile", { usuario: req.session.usuarioLogeado });
  },
  perfilEdit: function (req, res) {
    return res.render("user/profileEdit", { usuario: req.session.usuarioLogeado });
  },
  processEdit: async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) 
    {
    
      return res.render("user/profileEdit",{ usuario: req.session.usuarioLogeado ,  errors: errors.mapped()})

    }
    let avatar
    if (req.file) {
      avatar = req.file.filename
    } else {
      avatar = req.session.usuarioLogeado.avatar
    }
    const t = await sequelize.transaction()
    try {
      await db.Usuarios.update({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        avatar: avatar
      },
        { where: { id: req.session.usuarioLogeado.id } },
        { transaction: t });
      await t.commit();
      if (req.file) fs.unlinkSync(path.resolve(__dirname, '../../public/images/avatar/' + req.session.usuarioLogeado.avatar))
      req.session.usuarioLogeado.nombre = req.body.nombre
      req.session.usuarioLogeado.apellido = req.body.apellido
      req.session.usuarioLogeado.direccion = req.body.direccion
      req.session.usuarioLogeado.telefono = req.body.telefono
      req.session.usuarioLogeado.avatar = avatar
    } catch (error) {
      console.log(error);
      console.log('ocurrio un error');
      if (req.file) fs.unlinkSync(path.resolve(__dirname, '../../public/images/avatar/' + req.file.filename))
      await t.rollback();
    }
    res.redirect("/user/profile")
  }
  ,
  perfilEditPassword: function (req, res) {
    return res.render("user/profileEditPassword");
  },
  processEditPassword: async function (req, res) {
    const storedPassword = await db.Usuarios.findByPk(req.session.usuarioLogeado.id, { attributes: ['password'] })
    if (await bcryptjs.compare(req.body.oldPassword, storedPassword.password)) {
      const t = await sequelize.transaction()
      try {
        await db.Usuarios.update({ password: req.body.newPassword },
          { where: { id: req.session.usuarioLogeado.id } },
          { transaction: t });
        await t.commit();
        return res.redirect('/user/profile')
      } catch (error) {
        console.log(error);
        console.log('ocurrio un error');
        await t.rollback();
        return res.render("user/profileEditPassword", { errors: { datosIncorrectos: { msg: "Ocurrio un error" } } });
      }
    }
    return res.render("user/profileEditPassword", { errors: { datosIncorrectos: { msg: "Datos Incorrectos" } } });
  },
  cart: function (req, res) {
    return res.render("user/cart");
  },
  pwReset: function (req, res) {
    return res.render("user/pwReset");
  },
  pwResetCreateLink: async function (req, res) {
    
   try {
    const userInDb = await db.Usuarios.findOne({ where: { email: req.body.email } })
    if (userInDb) {
      const payload = {email:userInDb.email}
      const token =jwt.sign(payload,`${process.env.JWT_SECRET}${userInDb.password}`,{expiresIn:'15m'})
      const link = `http://localhost:3006/user/password-reset/${token}`
      //console.log(link)
      const mailOptions = {
        from: 'themebrandarg@gmail.com',
        to: req.body.email,
        subject: 'Recupera tu cuenta en Theme',
        text: `Ingresa al siguiente enlace para generar una nueva contraseña, este solo tendra validez por 15 minutos
${link}`
      };
      
      enviarEmail(mailOptions)
    
    }
   } catch (error) {
    console.log(error);
    res.send('Ocurrio un error')
   }
   
  },
  passwordResetForm:async function (req,res){
    const token = req.params.token
   try {
    const userInDb = await db.Usuarios.findOne({ where: { email: jwt.decode(token).email } })
    jwt.verify(token,`${process.env.JWT_SECRET}${userInDb.password}`)
    
    return res.render("user/pwResetform");
   } catch (error) {
    console.log(error);
    res.send('Token invalido o expirado')
   }
      
  
  },
  passwordResetProcess:async function (req,res){
  
    const t = await sequelize.transaction()
    try {
      const userInDb = await db.Usuarios.findOne({ where: { email: jwt.decode(req.params.token).email } })
    if(jwt.verify(req.params.token,`${process.env.JWT_SECRET}${userInDb.password}`)){
      await db.Usuarios.update({ password: req.body.newPassword },
        { where: { email: jwt.decode(req.params.token).email } },
        { transaction: t });
      await t.commit();
      return res.redirect('/user/login')
    }   
    } catch (error) {
      console.log('ocurrio un error');
      await t.rollback();
      res.send('Token invalido o expirado')
    }
  
  }
};
