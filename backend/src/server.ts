import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.ts';
import authRoutes from './routes/auth.routes.ts';
import adminRoutes from './routes/admin.routes.ts';
import profileRoutes from './routes/user.routes.ts';
import { authenticated, islogged, tokenVersion } from './middleware/auth.middleware.ts';
import { authorizeRole } from './middleware/role.middleware.ts';
import cors from 'cors';

// Load environment variables
dotenv.config();
const PORT: number = 4000;
//Connecting To Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req: Request, res: Response) => {
    res.json({ message: "HEllo world" });
})
app.use('/api/auth', islogged, authRoutes);
app.use('/api/admin', authenticated, tokenVersion, authorizeRole, adminRoutes);
app.use('/api/user', authenticated, tokenVersion, profileRoutes);

app.listen(PORT, () => {
    console.log('Server running on PORT: ', PORT);
})
