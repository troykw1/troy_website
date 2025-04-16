// index.js
const express = require('express');
const bodyParser = require('body-parser');
const client = require('./db');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // Serve the HTML form
});

app.post('/submit', async (req, res) => {
    const { name, email, message } = req.body;
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

// Contact/index.js
console.log("Executing code in Contacts folder 2");

module.exports = {
  message: "Hello from Contacts folder 2"
};
