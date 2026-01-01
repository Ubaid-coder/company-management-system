import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters long ']

        },
        role: {
            type: String,
            enum: ['admin', 'employee'],
            default: 'employee'
        },
        tokenVersion:{
            type: Number,
            default: 0
        },
        isBlocked: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }

)

const Users = mongoose.model('Users', userSchema) || mongoose.models.Users;
export default Users;