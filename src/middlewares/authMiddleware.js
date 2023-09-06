module.exports = {
    logged: function (req, res, next) {
        if (req.session.usuarioLogeado) {
            return res.redirect('/user/profile')
        } else next()
    },
    userAcess: function (req, res, next) {
        if (req.session.usuarioLogeado) {
            next()
        } else return res.redirect('/user/login')
    },
    adminAcces: function (req, res, next) {
        if ((req.session.usuarioLogeado && req.session.usuarioLogeado.categoria === "admin")||(req.session.usuarioLogeado && req.session.usuarioLogeado.categoria === "superadmin")) {
            next()
        } else return res.redirect('/')
    },
    superAdminAcces: function (req, res, next) {
        if ((req.session.usuarioLogeado && req.session.usuarioLogeado.categoria === "superadmin")) {
            next()
        } else return res.redirect('/')
    },
    isLogged: function (req, res, next) {
        res.locals.isLogged = false
        if (req.session.usuarioLogeado) {
            res.locals.isLogged = true
            if(req.session.usuarioLogeado.categoria === "admin") {
                res.locals.admin = true
            } else if (req.session.usuarioLogeado.categoria === "superadmin") {
                res.locals.superadmin = true
            }
            next()
        } else {
            next()
        }
    }
}