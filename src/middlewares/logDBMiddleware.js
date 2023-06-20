const fs = require('fs');
const { validationResult } = require('express-validator')

module.exports = {
    logEdit:(req, res, next) => {
    let errors = validationResult(req)
    if(errors.isEmpty()){
        fs.appendFileSync('log.txt',new Date + ' Se edito el resgistro id: '+ req.params.id + "\n")
    }
    next()}
}
