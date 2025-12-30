import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.Local_DB_URL as string);
        console.log(`Database connected: ${conn.connection}`);
    } catch (error) {
        console.error("Database connection error:",error );
        process.exit(1);
    }
}

export default connectDB;