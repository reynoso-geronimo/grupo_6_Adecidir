const validateAvatar = (req, res, next) => {
  if (!req.file) {
    req.file = { filename: 'defaultAvatar.png' };
  }

  next();
};

module.exports = validateAvatar;
