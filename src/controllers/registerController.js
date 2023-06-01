const path = require('path');


const productDetail = {
    registerForm:function(req,res) {

        return res.sendFile(path.resolve(__dirname, '../../views/register.html'))

    }

}

module.exports = productDetail