require('dotenv').config();
const app = require('./app');
const pool = require('./config/db');

const PORT = parseInt(process.env.PORT, 10) || 8080;
const HOST = '0.0.0.0';

// start once DB is ready
async function start() {
  try {
    await pool.query('SELECT 1');
    console.log('Database connected');
    app.listen(PORT, HOST, () => {
      console.log(`ForgeRealm API listening on ${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
}

// never exit silently
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});

start();
