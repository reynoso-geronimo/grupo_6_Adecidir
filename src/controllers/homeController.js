const fs = require('fs');

const categorias = JSON.parse(fs.readFileSync('./categorias.json')



)

const homeController = {
    index: function (req, res) {

        return res.render('home' , {categorias:categorias})

    }

}

module.exports = homeController