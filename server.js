const express = require('express'); // Import the express dependency
const path = require('path');       // Import path module for working with file paths
const bodyParser = require('body-parser'); // Import body-parser to parse form data
const app = express();              // Instantiate an express app
const port = 3000;                  // Save the port number where your server will be listening

// Middleware to parse form data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static(__dirname));                            
// app.use(express.static(path.join(__dirname, 'public')));

// Home Page 
// app.get('/', (req, res) => {
// res.send('Welcome to Troy K. Wille's website, I hope you enjoy it. <br><br> I built my website with: <ul><a href='https://nodejs.org/docs/latest/api/'</a><li>Node.js</li><a href='https://en.wikipedia.org/wiki/REST'</a><li>REST API</li><a href='https://www.postgresql.org/'</a><li>PostgreSQL</li></ul>');
// });
    
Route for the root URL
app.get('/', (req, res) => {                         
res.sendFile('index.html', { root: __dirname });         
});                                                            

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Log form data to verify it's being received (optional)
    console.log('Form Data:', { name, email, message });

    // Respond to the client
    res.send(`Thank you, ${name}! Your message has been received.`);
});

// Start the server
app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
