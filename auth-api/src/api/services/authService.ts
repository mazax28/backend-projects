import type { UserCreate, UserLogin } from "../schemas/userSchema"
import {userModel} from '../models/userModel'
import { generateToken } from "../../utils/jwtHandler";
import {hashPassword, comparePassword} from '../../utils/encryptionHandler'
import { generateVerificationToken } from "../../utils/verificationTokenGenerator"
import { sendWelcomeEmail,sendResetPasswordEmail } from "../../mailtrap/email";
import crypto from 'crypto';

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

const verifyEmailService = async (token: string) => {
    const user = await userModel.findOne({
        verificationToken: token,
        verificationTokenExpire: { $gt: new Date() },
    });

    if (!user) {
        throw new Error('Invalid token');
    }

    // Actualizar usuario
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpire = null;

    await user.save();
    await sendWelcomeEmail(user.email, user.name);

    // Retornar un objeto que indique el éxito de la operación
    return { success: true };  // Devuelves un objeto con un campo "success"
};


const forgotPasswordService = async (email: string) => {
    const user = await userModel.findOne({
        email,
    })
    if (!user) {
        throw new Error('User not found');
    }
    const resetPasswordToken = crypto.randomBytes(20).toString('hex');
    const resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 60 * 24); // Expira en 24h
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();

    await sendResetPasswordEmail(user.email, resetPasswordToken);
    return { success: true };

}

const resetPasswordService = async (resetToken: string, password: string) => {
    const user = await userModel.findOne({
        resetPasswordToken: resetToken,
        resetPasswordExpires: { $gt: new Date() },
    });
    if (!user) {
        throw new Error('Invalid token');
    }
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    return { success: true };

}


export {registerService,loginService,verifyEmailService, forgotPasswordService,resetPasswordService}