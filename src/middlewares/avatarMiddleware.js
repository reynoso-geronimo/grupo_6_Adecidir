const multer = require('multer')

const validateAvatar = (req, res, next) => {
  if (!req.file) {
    req.file = { filename: 'defaultAvatar.png' };
  }

  next();
};

  const upload = multer({ dest: 'public/images/avatar' });
  

  module.exports = validateAvatar;
