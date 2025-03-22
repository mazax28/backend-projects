import type {Request, Response} from 'express';
import { createUserSchema, loginUserSchema } from '../schemas/userSchema';
import { handleError } from '../../utils/eventHandlers';
import {registerService, loginService, verifyEmailService, resetPasswordService} from '../services/authService';
import {sendVerificationEmail} from '../../mailtrap/email';
import { verifyEmailTokenSchema } from '../schemas/authSchema';
import { forgotPasswordSchema } from '../schemas/authSchema';
import { forgotPasswordService } from '../services/authService';
import { resetPasswordSchema } from '../schemas/authSchema';


const registerCtlr = async (req: Request, res: Response) => {
    try {
        const {body} = req;
        createUserSchema.parse(body);
        const {user, token,verificationToken} = await registerService(body);
        await sendVerificationEmail(user.email, verificationToken);
        res.cookie('token', token, {httpOnly: true});
        res.status(201).json({user});
    }
    catch (error) {
        handleError(error as Error);
        res.status(500).send('Internal Server Error');
    }
}


const loginCtlr = async (req: Request, res: Response) => {
    try {
        const {body} = req;
        loginUserSchema.parse(body);
        const {user, token} = await loginService(body);

        res.cookie('token', token, {httpOnly: true});
        res.status(200).json({user});

    }
    catch (error) {
        handleError(error as Error);
        res.status(500).send('Internal Server Error');
    }
}

const verifyEmailCtlr = async (req: Request, res: Response) => {
    const { token } = req.body;
    
    try {
        // Validar el token usando Zod
        verifyEmailTokenSchema.parse({ token });

        // Llamar al servicio para verificar el email
        const result = await verifyEmailService(token);
        
        // Si la verificación es exitosa, enviar respuesta de éxito
        if (result.success) {
            return res.status(200).json({ success: true, message: 'Email verified successfully' });
        }

    } catch (error) {
        // Manejo de errores
        handleError(error as Error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
const logoutCtlr = async (req: Request, res: Response) => {
    try{
        res.clearCookie('token');
        res.status(200).json({message: 'Logout successful', success: true});
    }
    catch (error) {
        handleError(error as Error);
        res.status(500).send('Internal Server Error');
    }

}

const  forgotPasswordCtlr = async (req: Request, res: Response) => {
    try{
        const {body} = req;
        forgotPasswordSchema.parse(body);
        const {email} = body;
        await forgotPasswordService(email);
        res.status(200).json({message: 'Password reset email sent', success: true});
    }
    catch (error) {
        handleError(error as Error);
        res.status(500).send('Internal Server Error');
    }
}

const resetPasswordCtlr = async (req: Request, res: Response) => {
    try{
        const {body} = req;
        const {token} = req.params;
        resetPasswordSchema.parse(body);
        const {password} = body;
        await resetPasswordService(token,password);
        res.status(200).json({message: 'Password reset email sent', success: true});
    }
    catch (error) {
        handleError(error as Error);
        res.status(500).send('Internal Server Error');
    }

}

export {registerCtlr, loginCtlr, verifyEmailCtlr, logoutCtlr, forgotPasswordCtlr,resetPasswordCtlr};