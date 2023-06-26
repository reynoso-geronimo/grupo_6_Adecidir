const User = require('../models/User');


module.exports={
    recordame:(req,res,next)=>{
      
        if(req.cookies.recordame!=null&&req.session.usuarioLogeado==undefined){
            req.session.usuarioLogeado= User.findByField("email",req.cookies.recordame);
        }
        next()
    }
}