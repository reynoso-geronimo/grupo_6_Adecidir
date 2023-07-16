
function validateSession(req,res){
    let usuario = req.cookies.usuarioIniciado;
    if(usuario == undefined || usuario == null){
        res.redirect('/user/login')
    }
}
const cartController = {
    cart:function(req,res) {
        validateSession(req,res);
        return res.render('cart')

    }

}

module.exports = cartController