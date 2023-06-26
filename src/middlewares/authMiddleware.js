module.exports = {
    logged: function (req, res, next) {
        if (req.session.usuarioLogeado) {
            return res.redirect('/')
        } else next()
    },
    userAcess:function (req, res, next) {
        if (req.session.usuarioLogeado) {
            next()
        } else return res.redirect('/user/login')
    },
    isLogged:function (req,res,next) {
        res.locals.isLogged = false
        if (req.session.usuarioLogeado) {
            res.locals.isLogged = true
            next()
        }else{
            next()
        }
    }
}