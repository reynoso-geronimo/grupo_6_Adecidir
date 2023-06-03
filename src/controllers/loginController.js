const path = require('path');


const loginController = {
    loginForm:function(req,res) {

        return res.render(path.resolve('./views/user/login'))

    }

}

module.exports = loginController