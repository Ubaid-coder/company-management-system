import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { verifyToken } from "../utils/jwt.ts";

interface JwtPayload {
    userId: string;
    role: string;
}

export interface AuthRequest extends Request {
    user?: JwtPayload;
}

export const authenticated = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: 'Unauthorized'
            })
        }

        const token: string = authHeader.split(' ')[1] as string;
        const decode = verifyToken(token);
        if (!decode) {
            return res.status(401).json({
                error: 'Invalid Token'
            })
        };
        req.user = decode as JwtPayload;
        next();

    } catch (error) {
        return res.status(500).json({
            error: 'Invalid Token'
        })
    }
}