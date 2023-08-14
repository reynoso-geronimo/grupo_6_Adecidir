const db = require('../database/models')

const homeController = {
    index: async function (req, res) {
        const categorias = await  db.Categorias.findAll()
        return res.render('home' , {categorias:categorias})

    }

}

module.exports = homeController