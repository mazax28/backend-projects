import type { UserCreate, UserLogin } from "../schemas/userSchema"
import {userModel} from '../models/userModel'
import { generateToken } from "../../utils/jwtHandler";
import {hashPassword, comparePassword} from '../../utils/encryptionHandler'
import { generateVerificationToken } from "../../utils/verificationTokenGenerator"

const registerService = async (data: UserCreate) => {
    const hashedPassword = await hashPassword(data.password);
    const verificationToken = generateVerificationToken();
    const verificationTokenExpire = new Date(Date.now() + 1000 * 60 * 60 * 24); // Expira en 24h
    const user = await userModel.create({
        ...data,
        password: hashedPassword,
        resetPasswordToken: null, // Solo se usa cuando el usuario olvida su contraseña
        resetPasswordExpires: null,
        verificationToken,
        verificationTokenExpire,
    })

    if (!user) {
        throw new Error('User not created');
    }
    const token = generateToken(user._id.toString());
    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
        },
        verificationToken, // El código se retorna para enviar por correo
        token,
    };

}

const loginService = async (data: UserLogin) => {
    const user = await userModel.findOne({
        email: data.email
    }).select('+password');
    if (!user) {
        throw new Error('User not found');
    }
    console.log(user);
    const isPasswordValid = await comparePassword(data.password, user.password);
    const token = generateToken(user._id.toString());
    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
        },
        token
    }

}



export {registerService,loginService}