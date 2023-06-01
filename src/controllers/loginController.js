const path = require('path');


const loginController = {
    loginForm:function(req,res) {

        return res.sendFile(path.resolve(__dirname, '../../views/login.html'))

    }

}

module.exports = loginController