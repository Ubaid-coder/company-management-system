import jwt from 'jsonwebtoken';


export const generateToken = (userId: string, username: string, useremail: string, userrole: string) => {
    const secretKey: string = process.env.JWT_SECRET as string;
    const sign = jwt.sign(
        { userId, username, useremail, userrole },
        secretKey,
        { expiresIn: '1D' }
    );
    console.log('Sign', sign)
    return sign;

}
