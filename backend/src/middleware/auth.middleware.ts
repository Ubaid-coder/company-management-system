import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { verifyToken } from "../utils/jwt.ts";
import Users from "../models/User.ts";

interface JwtPayload {
    userId: string;
    role: string;
    tokenVersion?: number
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

export const tokenVersion = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = await Users.findById(req.user?.userId);
    const decodedToken = req.user?.tokenVersion;

    if (!user || user.tokenVersion !== decodedToken) {
        return res.status(401).json({
            error: 'Login Again'
        })
    };
    next();
}

export const islogged = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
        const token: string = authHeader.split(' ')[1] as string;
        const decode = verifyToken(token);
        if (decode) {
            return res.status(403).json({
                error: 'Already logged in'
            })
        }

    }
    next();
}

