const { body } = require('express-validator')

module.exports ={
    validarEdit : [
        body('name').notEmpty().withMessage('Debes completar el campo de nombre'),
        body('price').notEmpty().withMessage('Debes completar el campo de precio con un valor valido').bail().isNumeric().withMessage('Debes completar el campo de precio con un valor valido'),
        body('category').notEmpty().withMessage('Debes completar el campo de categoria'),
        body('desc').notEmpty().withMessage('Debes completar el campo de descripcion'),
        body('size[0]').notEmpty().withMessage('Debes completar el campo de talle S con un valor valido').bail().isInt().withMessage('Debes completar el campo de talle S con un valor valido'),
        body('size[1]').notEmpty().withMessage('Debes completar el campo de talle M con un valor valido').bail().isInt().withMessage('Debes completar el campo de talle M con un valor valido'),
        body('size[2]').notEmpty().withMessage('Debes completar el campo de talle L con un valor valido').bail().isInt().withMessage('Debes completar el campo de talle L con un valor valido'),
        body('size[3]').notEmpty().withMessage('Debes completar el campo de talle XL con un valor valido').bail().isInt().withMessage('Debes completar el campo de talle XL con un valor valido'),
        body('size[4]').notEmpty().withMessage('Debes completar el campo de talle XXL con un valor valido').bail().isInt().withMessage('Debes completar el campo de talle XXL con un valor valido'),
      
      ]
}