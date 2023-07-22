
const path = require('path');
const multer = require('multer');
const sharp = require('sharp')

module.exports = {

    upload: multer({
        storage: multer.memoryStorage(),
        limits: { fileSize: 1024 * 1024 * 10 },
        fileFilter: (req, file, cb) => {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, true);
            } else {
                req.fileValidationError = "Solo formato png, jpg o jpeg estan permitidos";
                return cb(null, false);
            }
        }

    }),
    procesarImagen: async (req, res, next) => {
        if (req.fileValidationError) { return next() }

        const ruta = `${path.resolve(__dirname, '../../public/images/productos')}/`

        for (const element of req.files) {
            const nombreImagen = Date.now() + Math.round(Math.random() * 1E9) + path.extname(element.originalname)
            element.filename = nombreImagen
            await sharp(element.buffer).resize({width: 300,withoutEnlargement: true}).toFile(`${ruta}${nombreImagen}`);
        }
        next();
    },
    multerErrors: (err, req, res, next) => { if (err.code == 'LIMIT_FILE_SIZE') { req.fileValidationError = "Limite 10 MB"; } next() }

}

