// index.js
const express = require('express');
const bodyParser = require('body-parser');
const client = require('./db');

const app = express();
const port = 5000;

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('All fields are required.');
    }

    try {
        const query = `
            INSERT INTO contacts (name, email, message)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [name, email, message];

        const result = await client.query(query, values);
        res.status(200).send({ success: true, contact: result.rows[0] });
    } catch (error) {
        console.error('Error inserting contact data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
