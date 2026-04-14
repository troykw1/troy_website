import express = require('express');
import path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// REMOVED: Duplicate const declarations that were causing the crash

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Static images
app.use('/images', express.static(path.join(process.cwd(), 'images')));

// Serve static files from the root directory
app.use(express.static(path.join(process.cwd(), '.')));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Form Data:', { name, email, message });
    
    // Note: You might want to update this URL to your Vercel URL later!
    res.send(`Thank you, ${name}! Your message has been received. <br> <a href='/'>Click here to return home</a>`);
});

// Start the server
app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});