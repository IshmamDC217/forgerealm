require('dotenv').config();

const app = require('./app');
const pool = require('./config/db');

const PORT = Number(process.env.PORT) || 8080;
const HOST = '0.0.0.0';

// 🔹 START SERVER IMMEDIATELY
app.listen(PORT, HOST, () => {
  console.log(`ForgeRealm API listening on ${HOST}:${PORT}`);
});

// 🔹 CONNECT TO DB AFTER SERVER IS UP
(async () => {
  try {
    await pool.query('SELECT 1');
    console.log('DB connected');
  } catch (err) {
    console.error('DB connection failed:', err.message);
  }
})();

// 🔹 NEVER EXIT THE PROCESS
process.on('unhandledRejection', err => {
  console.error('Unhandled rejection:', err);
});

process.on('uncaughtException', err => {
  console.error('Uncaught exception:', err);
});
