import express from 'express';
import type {Request, Response} from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.ts';
import Users from './models/User.ts';

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 4000;

//Connecting To Database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
    res.json({message: "HEllo world"});
})

app.listen(PORT, () => {
    console.log('Server running on PORT: ',PORT);
})
