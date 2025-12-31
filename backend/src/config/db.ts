import mongoose from 'mongoose';
import { Error } from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.Local_DB_URL as string);
        console.log(`Database connected to ${conn?.connection?.host}`);

    } catch (error: unknown) {
        console.error("Database connection error:", error instanceof Error ? error.message : error) ;
        process.exit(1);
    }
}

export default connectDB;