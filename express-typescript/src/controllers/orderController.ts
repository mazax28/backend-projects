import {prisma} from '../prismaClient'
import {errorHandlerHttp} from '../utils/errorHandler'
import type {Request, Response} from 'express'


const getOrdersCtrl = async (req: Request, res: Response) => {
    try{
        const orders = await prisma.order.findMany();
        res.json({orders});

    }
    catch(error){
        errorHandlerHttp(res,"ERROR_GET_ORDERS");
    }
}

export {getOrdersCtrl}