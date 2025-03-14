import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtHandler";


async function checkSession(req:Request,res:Response,next:NextFunction){
    
    try{
        const jwtToken= req.cookies.token || "";
        if (!jwtToken){
            res.status(400).send("ERROR_SESSION");
        }
        const isOk =  verifyToken(jwtToken);
        if (!isOk){
            res.status(400).send("ERROR_SESSION");
        }
        console.log("Session OK");
        next();


    }
    catch(error){
        res.status(400).send("ERROR_SESSION");
    }
}
export {checkSession}