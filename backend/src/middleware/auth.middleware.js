const { ApiError } = require('../utils/errors');

const requireAdmin = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return next(new ApiError(401, 'Authentication required'));
  }

  if (!req.user || req.user.role !== 'admin') {
    return next(new ApiError(403, 'Admin access required'));
  }

  next();
};

module.exports = { requireAdmin };
