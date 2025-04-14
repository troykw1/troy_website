const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const path = require('path');
const port = process.env.PORT || 3000;                  //Save the port number where your server will be listening

// Serve static files from the "Contact" directory
app.use(express.static(path.join(__dirname, 'Contact')));

// Handle requests to the contact route and serve index.html from Contact folder
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'Contact/index.html'));
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
}); 

