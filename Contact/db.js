// db.js
const { Client } = require('pg');
const client = new Client({
    user: 'test_56z1_user',
    host: 'dpg-cvu4fqre5dus73cg00lg-a',
    database: 'test_56z1',
    password: 'pxzCPED8b8aCc8JXJl4mDcUigBLt8RwY',
    port: 5433, // Default PostgreSQL port
});

client.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch(err => console.error("Connection error", err));

module.exports = client;
