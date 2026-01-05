const express = require('express');
const passport = require('passport');
const { login, register, me, logout } = require('../controllers/auth.controller');
const { requireAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/login', (req, res, next) => {
  const headers = req.headers; // all request headers
  console.log({ headers });
  return passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: info?.message || 'Invalid credentials' });
    req.logIn(user, (loginErr) => {
      if (loginErr) return next(loginErr);
      return login(req, res);
    });
  })(req, res, next)
}
);

router.post('/register', register);
router.get('/me', requireAdmin, me);
router.post('/logout', requireAdmin, logout);

module.exports = router;
