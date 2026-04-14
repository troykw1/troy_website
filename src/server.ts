import path from 'path';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();              // Instantiate an express app
const port = process.env.PORT || 3000;     // Save the port number where your server will be listening
const path = require('path');       // Import path module for working with file paths
const express = require('express'); // Import the express dependency
const bodyParser = require('body-parser'); // Import body-parser to parse form data
       
// Middleware to parse form data
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static images
app.use('/images', express.static(path.join(process.cwd(), 'images')));

// Serve static files from the current directory
// app.use(express.static(__dirname));                       
// app.use(express.static(path.join(__dirname, 'public'), { index: 'home.html' }));

app.use(express.static(path.join(__dirname, '.')));

// Home Page 
// app.get('/', (req, res) => {
// res.send('Welcome to Troy K. Wille's website, I hope you enjoy it. <br><br> I built my website with: <ul><a href='https://nodejs.org/docs/latest/api/'</a><li>Node.js</li><a href='https://en.wikipedia.org/wiki/REST'</a><li>REST API</li><a href='https://www.postgresql.org/'</a><li>PostgreSQL</li></ul>');
// });
    
// Root route
app.get('/', (req, res: Response) => {
  // process.cwd() points to the project root where index.html lives
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Log form data to verify it's being received (optional)
    console.log('Form Data:', { name, email, message });

    // Respond to the client
   // res.send(`Thank you, ${name}! Your message has been received.`);
    res.send(`Thank you${name}! Your message has been received. <br> <a href='https://troysnew-website.onrender.com'>Click here to return home</a>`);

});

// Start the server
app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
