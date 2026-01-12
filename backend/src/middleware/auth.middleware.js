const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/errors');

const requireAdmin = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    const authHeader = req.headers.authorization || '';
    const token =
      authHeader.startsWith('Bearer ') ? authHeader.slice(7) : req.headers['x-admin-token'] || null;
    if (!token) {
      return next(new ApiError(401, 'Authentication required'));
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return next(new ApiError(500, 'JWT_SECRET is not configured'));
    }
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;
    } catch {
      return next(new ApiError(401, 'Authentication required'));
    }
  }

  if (!req.user || req.user.role !== 'admin') {
    return next(new ApiError(403, 'Admin access required'));
  }

  next();
};

module.exports = { requireAdmin };
