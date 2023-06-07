const productDetailController = {
    list:function (req, res) {

            return res.render('products/list')

        
    },

    detail: function (req, res) {

        return res.render('products/productDetail')

    },
    editform: function (req, res) {
        return res.render('/products/productEdit')
    }
}

module.exports = productDetailController