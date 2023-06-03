const path = require('path');


const productDetail = {
    registerForm:function(req,res) {

        return res.render(path.resolve('./views/user/register'))

    }

}

module.exports = productDetail