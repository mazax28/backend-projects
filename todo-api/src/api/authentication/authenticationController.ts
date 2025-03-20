import type { Request, Response } from "express";
import { LoginSchemaValid,RegisterSchemaValid } from "./authenticationModel";
import { registerService, loginService } from "./authenticationService";



const registerCtrl = async (req: Request, res: Response) => {
    try{
        const newUser = RegisterSchemaValid.parse(req.body);
        const {user,token} = await registerService(newUser);
        res.cookie('token',token,{httpOnly:true});
        res.status(201).json({user});

    }
    catch(err){
        res.status(400).json({ error: err instanceof Error ? err.message : 'Error al procesar la solicitud' });
    }

}

const loginCtrl = async (req: Request, res: Response) => {
    try{
        const userLogin = LoginSchemaValid.parse(req.body);
        const {user, token} = await loginService(userLogin);
        res.cookie('token',token,{httpOnly:true});
        res.status(200).json({user});

    }
    catch(err){
        res.status(400).json({ error: err instanceof Error ? err.message : 'Error al procesar la solicitud' });
    }

}

export { registerCtrl, loginCtrl };