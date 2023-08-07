const fs = require('fs');
const path = require('path');
const db = require('../database/models')

const categorias = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/categorias.json'))



)

const homeController = {
    index: function (req, res) {

        return res.render('home' , {categorias:categorias})

    }

}

module.exports = homeController