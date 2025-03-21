import type {Request, Response} from 'express';
import { createUserSchema } from '../schemas/userSchema';
import { handleError } from '../../utils/eventHandlers';
import {registerService} from '../services/authService';

const registerCtlr = async (req: Request, res: Response) => {
    try {
        const {body} = req;
        createUserSchema.parse(body);
        const {user, token,verificationToken} = await registerService(body);
        res.cookie('token', token, {httpOnly: true});
        res.status(201).json({user});
    }
    catch (error) {
        handleError(error as Error);
        res.status(500).send('Internal Server Error');
    }
}