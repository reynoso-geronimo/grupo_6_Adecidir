const path = require('path');


const productDetailController = {
    detail:function(req,res) {

        return res.render('products/productDetail')

    },
    editform:function(req,res){
        return res.render('/products/productEdit')
    }
}

module.exports = productDetailController