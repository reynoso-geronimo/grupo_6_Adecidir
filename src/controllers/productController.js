const path = require('path');


const productDetailController = {
    detail:function(req,res) {

        return res.render(path.resolve('./views/products/productDetail'))

    },
    editform:function(req,res){
        return res.render(path.resolve('./views/products/productEdit'))
    }
}

module.exports = productDetailController