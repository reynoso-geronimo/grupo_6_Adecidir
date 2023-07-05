const fs = require("fs");
const path = require("path");

const usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../database/usuarios.json"), "utf-8"));



const cookieUsuario = (req, res, next) => {
    if (!req.session.usuarioLogeado && req.cookies.recordarUsuario){
        const usuario = usuarios.find((row) => row.email == req.cookies.recordarUsuario) 
        delete usuario.password
            req.session.usuarioLogeado = usuario   
    }
    next()
}



module.exports = cookieUsuario;