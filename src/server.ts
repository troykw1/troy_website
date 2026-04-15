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
        const result = await query(sql, [name, email, message]);
        
        res.status(200).json(result.rows[0]);
    } catch (error: any) {
        console.error('Database Error:', error.message);
        res.status(500).json({ error: "Database connection failed" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});