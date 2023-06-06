const path = require('path');


const loginController = {
    loginForm:function(req,res) {

        return res.render('user/login')

    }

}

module.exports = loginController