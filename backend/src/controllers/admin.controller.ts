import type { Request, Response } from "express";
import Users from "../models/User.ts";

export const adminPanel = async(req: Request, res: Response) => {
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