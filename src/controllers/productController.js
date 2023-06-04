const path = require('path');


const productDetailController = {
    detail:function(req,res) {

        return res.render(path.resolve('./views/products/productDetail'))

    }

}

module.exports = productDetailController