import type {Request, Response, NextFunction} from 'express';
import { verifyToken } from '../utils/jwtHandler';


const checkSession = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Checking session");
        const jwt_token = req.cookies.token || "";
        console.log(jwt_token);
        if (!jwt_token){
            throw new Error("ERROR_SESSION");
        }
        const isOk = verifyToken(jwt_token);
        if (!isOk){
            throw new Error("ERROR_SESSION");
        }
        console.log("Session OK");
        next();


}

export { checkSession }