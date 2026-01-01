import type { Response } from "express";
import Users from "../models/User.ts";
import type { AuthRequest } from "../middleware/auth.middleware.ts";

export const profile = async (req: AuthRequest, res: Response) => {
    const userId  = req.user?.userId;
    const user = await Users.findById(userId).select('-password');

    if(!user){
        return res.status(404).json({
            error:'User not found'
        })
    };
    return res.json({
        message:user
    })
}