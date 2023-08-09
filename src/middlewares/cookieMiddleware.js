const db = require('../database/models')

const cookieUsuario = async(req, res, next) => {
    if (!req.session.usuarioLogeado && req.cookies.recordarUsuario){
        const usuario = await db.Usuarios.findByPk(req.cookies.recordarUsuario) 
        delete usuario.password
            req.session.usuarioLogeado = usuario   
    }
    next()
}



module.exports = cookieUsuario;