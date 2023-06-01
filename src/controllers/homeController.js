const fs = require('fs');
const path = require('path');

const productos = JSON.parse(fs.readFileSync('./productos.json')



)

const homeController = {
    list: function (req, res) {

        return res.render(path.resolve(__dirname, '../views/home') , {productos:productos})

    }

}

module.exports = homeController