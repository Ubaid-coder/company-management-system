import jwt from 'jsonwebtoken';


export const generateToken = (userId: string, role: string, tokenVersion: number) => {
    const secretKey: string = process.env.JWT_SECRET as string;
    const sign = jwt.sign(
        { userId, role, tokenVersion },
        secretKey,
        { expiresIn: '1D' }
    );
    return sign;

}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
        
    }
}