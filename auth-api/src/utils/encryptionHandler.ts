import bcrypt from 'bcryptjs';

const hashPassword = async (password: string) =>{
    return await bcrypt.hash(password, 10);
}

const comparePassword = async (password: string, candidatePassword: string) => {
    return await bcrypt.compare(candidatePassword, password);
}

export {hashPassword, comparePassword};