const pgp = require('pg-promise')(); // Import pg-promise and create pgp instance [4, 7, 12]

const db = pgp({
  host: 'localhost',
  port: 5433,
  database: 'test',
  user: 'postgres',
  password: 'M1n1c00per',
});
module.exports = db;

