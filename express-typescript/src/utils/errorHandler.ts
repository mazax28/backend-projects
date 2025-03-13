import type { Response } from 'express';
export const errorHandlerHttp = (res:Response, error:string) =>{
    res.status(500).json({error: error});
}

