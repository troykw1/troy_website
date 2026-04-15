import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { query } from './db.js'; // Added .js extension for ES Module compatibility

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - Express now has built-in body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Files
app.use(express.static(path.join(__dirname, '../')));
app.use('/Contact', express.static(path.join(__dirname, '../Contact')));

// Root Route
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// POST Route
app.post('/submit', async (req: Request, res: Response) => {
    const { name, email, message } = req.body;

    try {
        const sql = 'INSERT INTO contact (name, email, message) VALUES ($1, $2, $3) RETURNING *';
        await query(sql, [name, email, message]);
        
        // Option A: Send a Success Code (Best for AJAX/Fetch)
        res.status(200).send("<h1>Thank You!</h1><p>Your message was sent.</p><a href='/'>Back to Home</a>");

        // Option B: Redirect to a custom thank-you.html page
        // res.redirect('/Contact/thank-you.html');

    } catch (error: any) {
        console.error('Database Error:', error.message);
        res.status(500).send("Internal Server Error");
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});