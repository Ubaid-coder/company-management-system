import jwt from 'jsonwebtoken';


export const generateToken = (userId: string, role: string) => {
    const secretKey: string = process.env.JWT_SECRET as string;
    const sign = jwt.sign(
        { userId, role },
        secretKey,
        { expiresIn: '1D' }
    );
    return sign;

}

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string);
}