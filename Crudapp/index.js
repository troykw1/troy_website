const express = require('express');
const { Pool } = require('pg');
const morgan = require('morgan');

// Create an instance of the Express application
const app = express();
const port = 3000;

// PostgreSQL connection configuration
const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'test',
    password: 'M1n1c00per',
    port: 5433 // Change this if your PostgreSQL server is running on a different port
});

// Middleware to parse JSON bodies
app.use(express.json());
app.use(morgan('dev')); 

// Home Page
app.get('/', (req, res) => {
     res.sendFile('index.html', {root: __dirname});  
});

// Define routes for CRUD operations

// Create (POST)
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
    const values = [name, email];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Read (GET)
app.get('/get_users', async (req, res) => {
  try {
    const query = 'SELECT * FROM users';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Update (PUT) using email as identifier
app.put('/users/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const { name } = req.body;
    const query = 'UPDATE users SET name = $1 WHERE email = $2 RETURNING *';
    const values = [name, email];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Delete (DELETE)
app.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'DELETE FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Crudapp/index.js
console.log("Executing code in Crudapp folder 1");

module.exports = {
  message: "Hi from Crudapp folder 1"
};
