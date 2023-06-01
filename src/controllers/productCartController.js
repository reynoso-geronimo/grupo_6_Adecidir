const path = require('path');


const productCartController = {
    productCart:function(req,res) {

        return res.sendFile(path.resolve(__dirname, './views/productCart.html'))

    }

}

module.exports = productCartController