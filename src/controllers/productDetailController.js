const path = require('path');


const productDetailController = {
    detail:function(req,res) {

        return res.render(path.resolve('./views/productDetail'))

    }

}

module.exports = productDetailController