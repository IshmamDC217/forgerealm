const path = require('path');
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const productRoutes = require('./routes/products.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/users.routes');
const { notFound, errorHandler } = require('./utils/errors');

const app = express();

// Trust proxy so we can read real client IPs behind Cloudflare/EB
app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limit login per real client IP (Cloudflare: cf-connecting-ip)
const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) =>
    req.headers['cf-connecting-ip'] ||
    (req.headers['x-forwarded-for'] && req.headers['x-forwarded-for'].split(',')[0].trim()) ||
    req.ip
});

// Basic request logger to trace inbound API calls
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`
    );
  });
  next();
});

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', loginLimiter, authRoutes);
app.use('/api/users', userRoutes);

// 404 + error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
