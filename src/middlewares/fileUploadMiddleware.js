
const path = require('path');
const multer = require('multer');



module.exports = {

    uploadImgProducto:multer({
        storage: multer.diskStorage({
          destination: function (req, file, cb) {
        
            cb(null, path.resolve(__dirname, '../../public/images/productos'))
          },
          filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9)
        
            cb(null, uniqueSuffix + path.extname(file.originalname))
          }
        }),
        limits:{fileSize:1024*1024*10},
        fileFilter: (req, file, cb) => {
          if (file.mimetype.includes('image')) {
            cb(null, true);
          } else {
      
            req.fileValidationError = "Solo imagenes estan permitidas";
            return cb(null, false);
      
          }
        }
      }),
      uploadImgAvatar:multer({
        storage: multer.diskStorage({
          destination: function (req, file, cb) {
              cb(null, path.resolve(__dirname, '../../public/images/avatar'))
          },
          filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9)
        
            cb(null, uniqueSuffix + path.extname(file.originalname))
          }
        }),
        limits:{fileSize:1024*1024*10},
        fileFilter: (req, file, cb) => {
          if (file.mimetype.includes('image')) {
            cb(null, true);
          } else {
      
            req.fileValidationError = "Solo imagenes estan permitidas";
            return cb(null, false);
      
          }
        }
      }),
}

