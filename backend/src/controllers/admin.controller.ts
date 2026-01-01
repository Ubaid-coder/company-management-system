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

export const updateRole = async (req: Request, res: Response) => {
    try {
        const { role, userId } = req.body;
        if (!userId || !role) {
            return res.status(400).json({
                error: 'All fields are required'
            })
        };
        if (!ROLES.includes(role)) {
            return res.status(400).json({
                erro: 'Invalid role value'
            })
        };

        const user = await Users.findByIdAndUpdate(userId, {
            role,
            $inc: { tokenVersion: 1 }
        }


        ).select('-password');

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

export const  blockUser = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const finduser = await Users.findById(id);
        if(finduser?.id == req.user?.userId){
            return res.status(400).json({
                error:'Cannot block your self'
            })
        }
        const user = await finduser?.updateOne({
            isBlocked: true,
            $inc: { tokenVersion: 1 }

        }, { new: true }).select('-password');

        if(!user){
            return res.status(404).json({
                error:'User Not Found'
            })
        }

        res.json({
            message: "User is now blocked",
           
        });

    } catch (error) {
        res.status(500).json({
            erro: 'Failed to blocked user'
        })
    }
}

export const unblockUser = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const finduser = await Users.findById(id);
        if(finduser?.id == req.user?.userId){
            return res.status(400).json({
                error:'Cannot unblock yourself'
            })
        }

        const user = await finduser?.updateOne({
            isBlocked: false,
            $inc: { tokenVersion: 1 }

        }, { new: true }).select('-password');

        if(!user){
            return res.status(404).json({
                error:'User Not Found'
            })
        }

        res.json({
            message: "User is now unblocked",
           
        });

    } catch (error) {
        res.status(500).json({
            erro: 'Failed to unblocked'
        })
    }
}
