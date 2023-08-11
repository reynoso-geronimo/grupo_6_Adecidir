const db = require('../database/models')

const cookieUsuario = async(req, res, next) => {
    if (!req.session.usuarioLogeado && req.cookies.recordarUsuario){
       try {
        const usuario = await db.Usuarios.findByPk(req.cookies.recordarUsuario) 
        delete usuario.password
            req.session.usuarioLogeado = usuario   
       } catch (error) {
        console.log("ocurrio un error al login con cookie");
       }
    }
    next()
}



module.exports = cookieUsuario;