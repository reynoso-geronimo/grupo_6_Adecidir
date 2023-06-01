const path = require('path');


const productDetail = {
    registerForm:function(req,res) {

        return res.sendFile(path.resolve('./views/register.html'))

    }

}

module.exports = productDetail