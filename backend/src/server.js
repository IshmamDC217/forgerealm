require('dotenv').config();
const app = require('./app');
const pool = require('./config/db');

// Be explicit: run on 8080 (EB default). If EB injects a port, prefer that only if set to 8080.
const PORT = process.env.PORT && Number(process.env.PORT) !== 0 ? Number(process.env.PORT) : 8080;
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
