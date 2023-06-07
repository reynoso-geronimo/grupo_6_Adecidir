let productos = [
    {
        nombre: "Buzo1",
        imagenes: ["/images/Buzo.jpg"]
    },
    {
        nombre: "Buzo2",
        imagenes: ["/images/Buzo2.jpg"]
    },
    {
        nombre: "Buzo3",
        imagenes: ["/images/Buzo3.jpg"]
    },
    {
        nombre: "Buzo4",
        imagenes: ["/images/Buzo4.jpg"]
    },
    {
        nombre: "Buzo5",
        imagenes: ["/images/Buzo.jpg"]
    },
    {
        nombre: "Buzo6",
        imagenes: ["/images/Buzo2.jpg"]
    }






]

const productDetailController = {



    list: function (req, res) {

        return res.render('products/productList', { productos: productos })


    },

    detail: function (req, res) {

        return res.render('products/productDetail')

    },
    editform: function (req, res) {
        return res.render('/products/productEdit')
    }
}

module.exports = productDetailController