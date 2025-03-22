import bcrypt from 'bcryptjs';

const hashPassword = async (password: string) =>{
    return await bcrypt.hash(password, 10);
}

const comparePassword = async (candidatePassword: string, hashedPassword:string) => {
    return await bcrypt.compare(candidatePassword, hashedPassword);
}

export {hashPassword, comparePassword};