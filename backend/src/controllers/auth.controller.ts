import type { Request, Response } from 'express';
import Users from '../models/User.ts';
import { comparePassword, hashPassword } from '../utils/hash.ts';
import { generateToken } from '../utils/jwt.ts';
import { Error } from 'mongoose';


interface user {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;

}

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, role }: { name: string, email: string, role: string } = req.body;
        let { password }: { password: string | number } = req.body;
        if (typeof password == 'number') {
            (password = password?.toString())
        };

        if (!name || !email || !password) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        if(password.length < 8){
            return res.status(400).json({
                error: 'Password must be at least 8 characters long'
            })
        }

    
        const exists: user | null = await Users.findOne({ email });

        if (exists) {
            return res.status(400).json({
                error: 'User already exists'
            });
        }

        const hashedPassword = await hashPassword(password);
        const User: user = await Users.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'employee'

        });

        return res.status(201).json({
            message: 'User registered successfully',
        });

    } catch (error: Error | unknown) {
        console.log(error instanceof Error ? error.message : error);
        res.status(500).json({
            error: `Internal server error ${error instanceof Error ? error.message : error}`
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email }: { email: string } = req.body;
        let { password }: { password: string | number } = req.body;
        if (typeof password == 'number') {
            (password = password?.toString())
        };

        if (!email || !password) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                error: 'Password must be at least 8 characters long'
            });
        }

        const User = await Users.findOne({ email });
        if (!User) {
            return res.status(400).json({
                error: 'Invalid email or password'
            });
        }
        if(User.isBlocked){
            return res.status(400).json({
                error:'You have been blocked'
            })
        }

        const isPasswordValid: boolean = await comparePassword(password, User.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                error: 'Invalid email or password'
            })
        }

        const token: string = await generateToken(User.id, User.role, User.tokenVersion);

        return res.status(200).json({
            message: 'Login successful',
            token
        })

    } catch (error) {
        res.status(500).json({
            error: 'Internal server error'
        })
    }
}