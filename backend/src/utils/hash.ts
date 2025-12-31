import bcrypt from "bcryptjs";

export const hashPassword = async (password: string)=> {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error: Error | unknown) {
        console.log(error instanceof Error ? error.message : error);
        throw new Error('Error hashing password');
    }
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error: Error | unknown) {
        console.log(error instanceof Error ? error.message : error);
        throw new Error('Error comparing password');
    }
}