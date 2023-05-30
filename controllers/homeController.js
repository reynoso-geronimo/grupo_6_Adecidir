const productos = [
    {
        nombre: "TOTE BAG",
        imagen: "/images/mockups-productos/Mockup_Bolsa_Algodon_mockupgratis.com.jpg"
    },
    {
        nombre: "THEME REMERA",
        imagen: "/images/mockups-productos/Mockup_Camiseta_Doblada_mockupgratis.com.jpg"
    },
    {
        nombre: "ANTEOJOS DE SOL",
        imagen: "/images/mockups-productos/Mockup_Estuche_Gafas_Sol_mockupgratis.com.jpg"
    },
    {
        nombre: "GORRO DE LANA",
        imagen: "/images/mockups-productos/Mockup_Gorro_Lana_mockupgratis.com.jpg"
    },
    {
        nombre: "BUZO",
        imagen: "/images/mockups-productos/Mockup_Hoodie_Sudadera_mockupgratis.com.jpg"
    },
    {
        nombre: "BARBIJO",
        imagen: "/images/mockups-productos/Mockup_mascarilla_logo_mockupgratis.com.jpg"
    }
]



const homeController = {
    list: function (req, res) {

        return res.render('home',{productos:productos})

    }

}

module.exports = homeController