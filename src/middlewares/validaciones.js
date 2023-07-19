const { body } = require('express-validator')

module.exports ={
    validarEdit : [
        body('name').notEmpty().withMessage('Debes completar el campo de nombre').trim().escape(),
        body('price').notEmpty().withMessage('Debes completar el campo de precio con un valor valido').bail().isFloat({gt:0}).withMessage('Debes completar el campo de precio con un valor valido').trim().escape(),
        body('category').notEmpty().withMessage('Debes completar el campo de categoria').trim().escape(),
        body('desc').notEmpty().withMessage('Debes completar el campo de descripcion').escape().trim(),
        body('size[0]').notEmpty().withMessage('Debes completar el campo de talle S con un valor valido').bail().isInt({ gt: -1 }).withMessage('Debes completar el campo de talle S con un valor valido').trim().escape(),
        body('size[1]').notEmpty().withMessage('Debes completar el campo de talle M con un valor valido').bail().isInt({ gt: -1 }).withMessage('Debes completar el campo de talle M con un valor valido').trim().escape(),
        body('size[2]').notEmpty().withMessage('Debes completar el campo de talle L con un valor valido').bail().isInt({ gt: -1 }).withMessage('Debes completar el campo de talle L con un valor valido').trim().escape(),
        body('size[3]').notEmpty().withMessage('Debes completar el campo de talle XL con un valor valido').bail().isInt({ gt: -1 }).withMessage('Debes completar el campo de talle XL con un valor valido').trim().escape(),
        body('size[4]').notEmpty().withMessage('Debes completar el campo de talle XXL con un valor valido').bail().isInt({ gt: -1 }).withMessage('Debes completar el campo de talle XXL con un valor valido').trim().escape(),
      
      ]
}