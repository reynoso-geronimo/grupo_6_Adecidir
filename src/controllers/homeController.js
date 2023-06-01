const fs = require('fs');
const path = require('path');

const productos = JSON.parse(fs.readFileSync('./productos.json')



)

const homeController = {
    index: function (req, res) {

        return res.render(path.resolve('./views/home') , {productos:productos})

    }

}

module.exports = homeController