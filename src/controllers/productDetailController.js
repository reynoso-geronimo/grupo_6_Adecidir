const path = require('path');


const productDetailController = {
    detail:function(req,res) {

        return res.sendFile(path.resolve('./views/productDetail.html'))

    }

}

module.exports = productDetailController