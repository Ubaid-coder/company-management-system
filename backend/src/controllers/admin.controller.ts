import type { Request, Response } from "express";
import Users from "../models/User.ts";
import { ROLES } from '../const/roles.ts'
import type { AuthRequest } from "../middleware/auth.middleware.ts";


export const adminPanel = async (req: Request, res: Response) => {
    try {
        const allUsers = await Users.find();
        res.status(200).json({
            message: 'All users',
            users: allUsers
        })
    } catch (error) {
        console.log(error);
    }
}

export const findUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await Users.findById(id);
        res.status(200).json({
            message: 'user',
            user: user
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, role, isBlocked } = req.body;

        if (!ROLES.includes(role)) {
            return res.status(400).json({
                erro: 'Invalid role value'
            })
        };
        const adminUser = await Users.find({ role: 'admin' });

        const finduser = await Users.findById(id);
        if (isBlocked == true && finduser?.id == req.user?.userId) {
            return res.status(400).json({
                error: 'Cannot block your self'
            })
        };
        
        if (role == 'employee' && adminUser.length <= 1) {
            return res.status(400).json({
                error: 'Atleast one admin required'
            })
        }

        const user = await finduser?.updateOne({
            name,
            email,
            role,
            isBlocked,
            $inc: { tokenVersion: 1 }
        }).select('-password');

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            })
        };

        res.json({
            message: 'User role updated',
            user
        });
    } catch (error) {
        res.status(500).json({
            erro: 'Failed to update role'
        })
    }
}

