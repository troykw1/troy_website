// index.js
const express = require('express');
const bodyParser = require('body-parser');
const client = require('./db');

const app = express();
const port = 5000;

const fs = require('fs/promises');

async function checkFileExistence(filePath) {
    try {
        await fs.access(filePath);
        console.log('File exists');
    } catch {
        console.log('File does not exist');
    }
}

checkFileExistence('/path/to/file');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'Contact/index.html'); // Serve the HTML form
});

app.post('/submit', async (req, res) => {
    const { name, email, message } = req.body;
    console.log("Received data:", { name, email, message });

    try {
        const result = await client.query(
            'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)',
            [name, email, message]
        );
        console.log("Data inserted successfully");
        res.send('Thank you, we will be in contact with you shortly!');
    } catch (err) {
        console.error("Error inserting data", err);
        res.status(500).send('Error saving data');
    }
});   

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
