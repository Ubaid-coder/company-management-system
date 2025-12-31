import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.ts';
import authRoutes from './routes/auth.route.ts';
import adminRoutes from './routes/admin.routes.ts'

// Load environment variables
dotenv.config();
const PORT: number = 4000;
//Connecting To Database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
    res.json({ message: "HEllo world" });
})
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
    console.log('Server running on PORT: ', PORT);
})
