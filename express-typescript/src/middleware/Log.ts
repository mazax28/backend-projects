import type { Request,Response,NextFunction } from 'express';
const logMiddleware = (req:Request,res:Response,next:NextFunction) =>{
    const {headers} = req;
    const {method} = req;
    const {ip} = req;
    const userAgent = headers['user-agent'];
    console.log(`${method} request from IP: ${ip}, User-Agent: ${userAgent}`);

    next();
}

export {logMiddleware}