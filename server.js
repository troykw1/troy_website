const express = require('express'); // Import the express dependency
const path = require('path');       // Import path module for working with file paths
const app = express();              // Instantiate an express app
const port = 3000;                  // Save the port number where your server will be listening

// Serve static files from the current directory (or specify a public folder)
app.use(express.static(__dirname));

// Idiomatic expression in Express to route and respond to a client request
app.get('/', (req, res) => {        // Handle root URL ("/")
    res.sendFile('index.html', { root: __dirname }); // Send index.html at the root
});

app.listen(port, () => {            // Start the server
    console.log(`Now listening on port ${port}`);
});
