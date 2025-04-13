const fs = require('fs');
const csv = require('csv-parser');
const pgp = require('pg-promise')(); // Import pg-promise and create pgp instance
const db = require('./db');

// File path to the CSV file
const csvFilePath = 'data.csv';

// Function to insert data into PostgreSQL
const insertData = async (data) => {
  try {
    // Clear the table before inserting new data
    await db.none('TRUNCATE TABLE customers RESTART IDENTITY');

    // Use pg-promise for bulk insertion
    const query = pgp.helpers.insert(data, ['id', 'name', 'email'], 'customers');
    await db.none(query);
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error.message);
  }
};

// Parse the CSV and prepare data
const parseCsvAndInsert = () => {
  const data = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      data.push({
        id: row.id, // Map id to id
        name: row.name,
        email: row.email,
      });
    })
    .on('end', async () => {
      console.log(`Parsed ${data.length} rows from CSV`);
      await insertData(data);
    })
    .on('error', (err) => {
      console.error('Error reading CSV:', err.message);
    });
};

// Execute the function
parseCsvAndInsert();

// Csvtopostgres/index.js
console.log("Executing code in Csvtopostgres folder 3");

module.exports = {
  message: "Hey from Csvtopostgres folder 3"
};