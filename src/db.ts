import { Client } from 'pg';
import * as dotenv from 'dotenv';

// Initialize environment variables from .env file
dotenv.config();

// Determine if we are running locally to decide on SSL usage
const isLocal = process.env.PG_HOST === 'localhost' || process.env.PG_HOST === '127.0.0.1';

const client = new Client({
    // Check for the prefixed Vercel URL first, then the standard one, then fallback to local
    connectionString: process.env.NEON_DATABASE_URL || process.env.POSTGRES_URL || undefined,
    
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT) || 5432,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    
    ssl: isLocal ? false : { rejectUnauthorized: false }
});

client.connect()
    .then(() => console.log("✅ Connected to PostgreSQL"))
    .catch((err: any) => {
        console.error("❌ PostgreSQL connection error:", err.message);
    });

export default client;