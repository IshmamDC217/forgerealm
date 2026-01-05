const { ApiError } = require('../utils/errors');

const requireAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    req.user = req.session.user;
    return next();
  }
  return next(new ApiError(401, 'Authentication required'));
};

module.exports = { requireAdmin };
