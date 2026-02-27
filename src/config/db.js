const { pool } = require('../db/client');

const connectDB = async () => {
  await pool.query('SELECT 1');
  console.log('PostgreSQL connected');
};

module.exports = connectDB;
