import type {Request, Response} from 'express';
import { createUserSchema, loginUserSchema } from '../schemas/userSchema';
import { handleError } from '../../utils/eventHandlers';
import {registerService, loginService} from '../services/authService';
import {sendVerificationEmail} from '../../mailtrap/email';

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

export {registerCtlr, loginCtlr}