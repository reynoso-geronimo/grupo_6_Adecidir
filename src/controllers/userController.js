module.exports = {
    loginForm: function (req, res) {

        return res.render('user/login')

    },
    registerForm:function(req,res) {

        return res.render('user/register')

    }

}


