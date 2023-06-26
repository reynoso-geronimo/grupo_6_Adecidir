const bcrypt = require("bcrypt");
const User = require("../models/User");
const session = require("express-session");

module.exports = {
  loginForm: function (req, res) {

    return res.render("user/login");
  },
  processLogin: function (req, res) {
    const usuario = User.findByField("email", req.body.email);

    if (usuario && bcrypt.compareSync(req.body.password, usuario.password)) {
      //login exitoso
      req.session.usuarioLogeado = { id: usuario.id, nombre: usuario.nombre }
      if (req.body.keepalive)
        res.cookie("recordame", usuario.email, { maxAge: 600000 });
      return res.redirect("/");
    }
    //login fallido
    return res.redirect("/user/login");
  },
  registerForm: function (req, res) {

    return res.render("user/register");
  },
  processRegister: (req, res) => {
    const userInDb = User.findByField("email", req.body.email);

    if (userInDb) return res.send("Email ya en uso");

    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));
    const nuevoUsuario = {
      nombre: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    User.createUsers(nuevoUsuario);
    return res.redirect("/user/login");
  },
  logout: function (req,res) {
    console.log(session.session)
    req.session.destroy()

    res.clearCookie("recordame");
    res.redirect('/')
  }
};
