const { body } = require('express-validator')

module.exports ={
    validarEdit : [
        body('name').notEmpty().withMessage('Debes completar el campo de nombre'),
        body('price').notEmpty().withMessage('Debes completar el campo de precio').bail().isNumeric().withMessage('Debes ingresar un valor valido'),
        body('category').notEmpty().withMessage('Debes completar el campo de categoria'),
        body('desc').notEmpty().withMessage('Debes completar el campo de descripcion'),
        body('size[0]').notEmpty().withMessage('Debes completar el campo de talle S').bail().isInt().withMessage('Debes ingresar un valor valido en el campo de talle'),
        body('size[1]').notEmpty().withMessage('Debes completar el campo de talle M').bail().isInt().withMessage('Debes ingresar un valor valido en el campo de talle'),
        body('size[2]').notEmpty().withMessage('Debes completar el campo de talle L').bail().isInt().withMessage('Debes ingresar un valor valido en el campo de talle'),
        body('size[3]').notEmpty().withMessage('Debes completar el campo de talle XL').bail().isInt().withMessage('Debes ingresar un valor valido en el campo de talle'),
        body('size[4]').notEmpty().withMessage('Debes completar el campo de talle XXL').bail().isInt().withMessage('Debes ingresar un valor valido en el campo de talle'),
      
      ]
}