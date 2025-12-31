import type { NextFunction, Response } from "express"
import type { AuthRequest } from "./auth.middleware.ts"

export const authorizeRole = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
       
        if (!req.user || req.user?.role !== 'admin') {
            return res.status(403).json({
                error: 'Forbidden'
            })
        }

        next();
    } catch (error) {
        console.log(error)
    }
}