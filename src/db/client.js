const { Pool } = require('pg');
const { drizzle } = require('drizzle-orm/node-postgres');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not configured in environment variables.');
}

const pool = new Pool({ connectionString });
const db = drizzle(pool);

module.exports = { db, pool };
