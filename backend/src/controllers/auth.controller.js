const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { ApiError, asyncHandler } = require('../utils/errors');
const pool = require('../config/db');

const hashPassword = (password, salt) =>
  crypto.createHash('sha256').update(password + salt).digest('hex');

const generateSalt = () => crypto.randomBytes(16).toString('hex');

const getDbAdmin = async (username) => {
  const [rows] = await pool.query(
    'SELECT id, username, password_hash, salt, role FROM admin_users WHERE username = ? LIMIT 1',
    [username]
  );
  return rows[0];
};

const createUser = async ({ username, email, password }) => {
  const salt = generateSalt();
  const passwordHash = hashPassword(password, salt);
  const [result] = await pool.query(
    'INSERT INTO users (username, email, password_hash, salt, role, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
    [username, email || null, passwordHash, salt, 'user']
  );
  return { id: result.insertId, username, email, role: 'user' };
};

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new ApiError(500, 'JWT_SECRET is not configured');
  }

  // Prefer DB admins
  const dbAdmin = await getDbAdmin(username);
  if (dbAdmin) {
    const computed = hashPassword(password, dbAdmin.salt);
    if (computed !== dbAdmin.password_hash) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const token = jwt.sign(
      { role: dbAdmin.role || 'admin', username: dbAdmin.username, adminId: dbAdmin.id },
      jwtSecret,
      { expiresIn: '12h' }
    );

    return res.json({ token });
  }

  // Fallback to env-configured admins (backwards compatibility)
  const admins = [
    {
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'changeme'
    },
    {
      username: process.env.ADMIN_USERNAME_2,
      password: process.env.ADMIN_PASSWORD_2
    },
    {
      username: process.env.ADMIN_USERNAME_3,
      password: process.env.ADMIN_PASSWORD_3
    }
  ].filter((admin) => admin.username && admin.password);

  const match = admins.find((admin) => admin.username === username && admin.password === password);

  if (!match) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = jwt.sign({ role: 'admin', username: match.username }, jwtSecret, {
    expiresIn: '12h'
  });

  res.json({ token });
});

const register = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) throw new ApiError(500, 'JWT_SECRET is not configured');
  if (!username || !password) throw new ApiError(400, 'username and password are required');
  if (username.length < 3) throw new ApiError(400, 'username must be at least 3 characters');
  if (password.length < 8) throw new ApiError(400, 'password must be at least 8 characters');

  const [existing] = await pool.query(
    'SELECT id FROM users WHERE username = ? OR (email IS NOT NULL AND email = ?) LIMIT 1',
    [username, email || null]
  );
  if (existing.length > 0) {
    throw new ApiError(409, 'User already exists');
  }

  const user = await createUser({ username, email, password });
  const token = jwt.sign(
    { role: user.role, username: user.username, userId: user.id },
    jwtSecret,
    { expiresIn: '12h' }
  );

  res.status(201).json({ token, user: { id: user.id, username: user.username, email } });
});

const me = asyncHandler(async (req, res) => {
  // requireAdmin middleware already validated and attached req.user
  res.json({ user: { username: req.user.username, role: req.user.role } });
});

const logout = asyncHandler(async (req, res) => {
  // Stateless JWT logout: client should discard token; no server blacklist for MVP.
  res.json({ message: 'Logged out' });
});

module.exports = { login, register, me, logout };
