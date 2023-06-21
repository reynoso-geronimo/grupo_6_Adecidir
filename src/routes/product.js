const express = require('express');
const router = express.Router()
const product = require('../controllers/productController.js');
const { body } = require('express-validator')
const logDB = require('../middlewares/logDBMiddleware.js')
const path = require('path');
const multer = require('multer');

const validarEdit = [
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


const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, path.resolve(__dirname, '../../public/images/productos'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9)

    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {

      const error = new Error('solo .png, .jpg, and .jpeg esta permitido!');
      error.status = 400;
      cb(error, false);

    }
  }
})



router.get('/list/:categoria?', product.list)
router.get("/crearProducto", product.crearProductoForm);

router.get("/:id", product.detail);


router.get('/:id/editform/', product.editForm)
router.put('/:id/', upload.array("images"), validarEdit, logDB.logEdit, product.editItem)

// router.delete('/:id/delete',product.delete)


module.exports = router;
