import pg from "pg";
const { Pool, Client } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
