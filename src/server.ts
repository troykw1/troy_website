import express from 'express'; // Standard TS import
import path from 'path';
import * as bodyParser from 'body-parser';
import client from './db'; // This matches the 'export default' in db.ts

const app = express();
const port = process.env.PORT || 3000;

// --- Middleware ---
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// --- Static Files ---
// Serve images
app.use('/images', express.static(path.join(process.cwd(), 'images')));

// Serve the Contact folder assets (index.html inside /Contact)
app.use('/Contact', express.static(path.join(process.cwd(), 'Contact')));

// Serve other static files from root
app.use(express.static(path.join(process.cwd(), '.')));

// --- Routes ---

// Home Page
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

// Database Submission Route
app.post('/submit', async (req, res) => {
    const { name, email, message } = req.body;
    console.log('Received Form Data:', { name, email, message });

    try {
        // 1. Try the database query
        const result = await client.query(
            'INSERT INTO contact (name, email, message) VALUES ($1, $2, $3) RETURNING *', 
            [name, email, message]
        );
        
        console.log('Success:', result.rows[0]);
        
        // 2. Stop the spinning on success
        res.send(`<h1>Success!</h1><p>Thank you ${name}.</p><a href="/">Go Home</a>`);

    } catch (error) {
        // 3. Stop the spinning on failure
        console.error('❌ Database Error:', error.message);
        res.status(500).send("The database is not responding. Check your table name and connection.");
    }
});

// --- Start Server ---
app.listen(port, () => {
    console.log(`Server is live and listening on port ${port}`);
});