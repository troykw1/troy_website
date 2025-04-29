const pgp = require('pg-promise')(); // Import pg-promise and create pgp instance [4, 7, 12]

const db = pgp({
   host: process.env.PG_HOST,
   port: process.env.PG_PORT,
   user: process.env.PG_USER,
   password: process.env.PG_PASSWORD,
   database: process.env.PG_DATABASE
});
module.exports = db;

