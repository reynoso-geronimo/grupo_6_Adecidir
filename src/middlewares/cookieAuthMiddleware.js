const fs = require('fs');
const path = require('path');
const usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../database/usuarios.json"), "utf-8"))

module.exports={
    recordame:(req,res,next)=>{
        if(req.cookies.recordame!=null&&req.session.usuarioLogeado==undefined){
            req.session.usuarioLogeado= usuarios.find((row)=>row.email==req.cookies.recordame);
        }
        next()
    }
}