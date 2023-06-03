const path = require('path');


const productCartController = {
    productCart:function(req,res) {

        return res.render(path.resolve('./views/productCart'))

    }

}

module.exports = productCartController