require('dotenv').config();
const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

async function start() {
  try {
    await pool.query('SELECT 1');
    app.listen(PORT, HOST, () => {
      console.log(`ForgeRealm API listening on ${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
