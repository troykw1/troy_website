import express, { Request, Response } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
// Note: We import the 'query' function we just created in db.ts
import { query } from './db.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
// Assuming your HTML is in the project root or a 'public' folder
app.use(express.static(path.join(__dirname, '../')));
app.use('/Contact', express.static(path.join(__dirname, '../Contact')));

// Root Route
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Contact Form POST Route
app.post('/Contact', async (req: Request, res: Response) => {
    const { name, email, message } = req.body;

    console.log('Received Form Data:', { name, email, message });

    // Validation
    if (!name || !email || !message) {
        return res.status(400).send("All fields are required.");
    }

    try {
        // Use the serverless-friendly query function
        const sql = 'INSERT INTO contact (name, email, message) VALUES ($1, $2, $3) RETURNING *';
        const values = [name, email, message];
        
        const result = await query(sql, values);

        console.log("Success:", result.rows[0]);
        
        // Return success to the frontend
        res.status(200).json(result.rows[0]);

    } catch (error: any) {
        // Log the specific error for Vercel Logs
        console.error('❌ Database Error:', error.message);
        
        res.status(500).send("The database is not responding. Please try again later.");
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is live and listening on port ${PORT}`);
});