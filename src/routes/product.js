const express = require('express');
const router = express.Router()
const product = require('../controllers/productController.js');
const {body}= require('express-validator')
const logDB = require('../middlewares/logDBMiddleware.js')
const path = require('path');
const multer = require('multer');

const validarEdit=[
  body('name').notEmpty().withMessage('Debes completar el campo de nombre'),
  body('price').notEmpty().withMessage('Debes completar el campo de precio').bail().isNumeric().withMessage('Debes ingresar un valor valido'),
  body('category').notEmpty().withMessage('Debes completar el campo de categoria'),
  body('descripcion').notEmpty().withMessage('Debes completar el campo de descripcion'),
  body('size[0]').notEmpty().withMessage('Debes completar el campo de talle S').bail().isInt().withMessage('Debes ingresar un valor valido'),
  body('size[1]').notEmpty().withMessage('Debes completar el campo de talle M').bail().isInt().withMessage('Debes ingresar un valor valido'),
  body('size[2]').notEmpty().withMessage('Debes completar el campo de talle L').bail().isInt().withMessage('Debes ingresar un valor valido'),
  body('size[3]').notEmpty().withMessage('Debes completar el campo de talle XL').bail().isInt().withMessage('Debes ingresar un valor valido'),
  body('size[4]').notEmpty().withMessage('Debes completar el campo de talle XXL').bail().isInt().withMessage('Debes ingresar un valor valido'),
]


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname,'../../public/images/productos'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })



router.get('/list', product.list)
router.get("/crearProducto", product.crearProductoForm);

router.get("/:id", product.detail);


router.get('/:id/editform/', product.editForm)
router.put('/:id/',validarEdit ,logDB.logEdit ,product.editItem)
router.put('/:id/upimages', upload.any("images"),product.editImages)
// router.delete('/:id/delete',product.delete)


module.exports = router;
