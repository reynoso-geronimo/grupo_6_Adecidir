const multer = require('multer')

const validateAvatar = (req, res, next) => {
  const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9);
    const filename = uniqueSuffix + '.png'
    req.file = { filename }
    
    next();
}

  const upload = multer({ dest: 'public/images/avatar' });
  

  module.exports = validateAvatar;