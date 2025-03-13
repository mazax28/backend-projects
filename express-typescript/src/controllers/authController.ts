import type { Request, Response } from "express";
import { errorHandlerHttp } from "../utils/errorHandler";
import { loginUser,registerNewUser } from "../services/authService";

const loginCtrl = async (req: Request, res: Response) => {
    try{
        const userLogin = await loginUser(req.body);
        res.status(200).json({user: userLogin});
    }
    catch(error){
        errorHandlerHttp(res,"ERROR_LOGIN");
    }

}

const registerCtrl = async (req: Request, res: Response) => {
    try{
        const userRegister = await registerNewUser(req.body);
        res.status(201).json({userRegister});

    }
    catch(error){
        errorHandlerHttp(res,"ERROR_REGISTER");
    }
}

export { loginCtrl, registerCtrl }