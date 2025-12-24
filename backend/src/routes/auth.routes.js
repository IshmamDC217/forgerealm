const express = require('express');
const { login, register, me, logout } = require('../controllers/auth.controller');
const { requireAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', requireAdmin, me);
router.post('/logout', requireAdmin, logout);

module.exports = router;
