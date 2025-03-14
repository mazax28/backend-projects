import type { Request, Response } from "express";
import { errorHandlerHttp } from "../utils/errorHandler";
import { loginUser,registerNewUser } from "../services/authService";

const loginCtrl = async (req: Request, res: Response) => {
    try{
        
        const {user, token} = await loginUser(req.body);
        res.cookie("token", token, {
            httpOnly: true,  // Evita que JavaScript acceda a la cookie
        });
        res.status(200).json({user});
    }
    catch(error){
        errorHandlerHttp(res,"ERROR_LOGIN");
    }

}

const registerCtrl = async (req: Request, res: Response) => {
    try{
        const {user,token} = await registerNewUser(req.body);
        res.cookie("token", token, {
            httpOnly: true,  // Evita que JavaScript acceda a la cookie
        });
        res.status(201).json({user});

    }
    catch(error){
        errorHandlerHttp(res,"ERROR_REGISTER");
    }
}
const logoutCtrl = async (req: Request, res: Response) => {
    res.clearCookie("token");
    res.status(200).send("Logout OK")
}
export { loginCtrl, registerCtrl, logoutCtrl }