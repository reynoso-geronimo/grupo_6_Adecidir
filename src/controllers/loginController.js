const path = require('path');


const loginController = {
    loginForm:function(req,res) {

        return res.sendFile(path.resolve('./views/login.html'))

    }

}

module.exports = loginController