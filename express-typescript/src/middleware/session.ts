import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtHandler";


async function checkSession(req:Request,res:Response,next:NextFunction){
    
    try{
        const jwtByUser = req.headers.authorization || "";
        if (!jwtByUser){
            res.status(400).send("ERROR_SESSION");
        }
        const token = jwtByUser.split(" ")[1];
        const isOk =  verifyToken(token);
        if (!isOk){
            res.status(400).send("ERROR_SESSION");
        }
        next();


    }
    catch(error){
        res.status(400).send("ERROR_SESSION");
    }
}
export {checkSession}