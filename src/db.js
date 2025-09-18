import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// 1. Use pg.Pool instead of pg.Client
const pool = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Optional: Add an error listener for the pool
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// 2. Export a query function that uses the pool
export const query = (text, params) => pool.query(text, params);