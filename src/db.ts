import pg from 'pg';
const { Client } = pg;

export const query = async (text: string, params: any[]) => {
  const isLocal = process.env.PG_HOST === 'localhost';
  
  const client = new Client({
    connectionString: process.env.NEON_DATABASE_URL || process.env.POSTGRES_URL,
    // Fallback for your local 5433 setup
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT) || 5432,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    ssl: isLocal ? false : { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000, // Give Neon 10s to wake up
  });

  await client.connect();
  try {
    return await client.query(text, params);
  } finally {
    await client.end();
  }
};