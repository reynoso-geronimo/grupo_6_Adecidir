const fs = require('fs');

module.exports = {
    logEdit:(req, res, next) => {
    fs.appendFileSync('log.txt',new Date + ' Se edito el resgistro id: '+ req.params.id + "\n")
    next()}
}
