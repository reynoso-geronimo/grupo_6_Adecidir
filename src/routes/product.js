const express = require('express');
const router = express.Router()
const product = require('../controllers/productController.js');
const path = require('path');
const multer = require('multer');


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
router.put('/:id/', product.editItem)
router.put('/:id/upimages', upload.any("images"),product.editImages)
// router.delete('/:id/delete',product.delete)


module.exports = router;
