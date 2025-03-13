import type {Request, Response} from 'express';
import {errorHandlerHttp} from '../utils/errorHandler';
import { getItemsService, insertItemService,getItemService,updateItemService,deleteItemService } from '../services/itemServices'

const getItems = async (req:Request,res:Response) => {
    try{
        const responseItems = await getItemsService();
        res.status(200).json({items: responseItems});
    }
    catch(error){
        errorHandlerHttp(res,"ERROR_GET_ITEM");
    }
}


const getItem = async (req:Request,res:Response) => {
    try{
        const {id} = req.params;
        const item = await getItemService(parseInt(id));
        res.status(200).json({item});
    }
    catch(error){
        errorHandlerHttp(res,"ERROR_GET_ITEM");
    }

}

const insertItem = async (req:Request, res:Response) => {
    const {body} = req;
    try{
        const itemInsert = await insertItemService(body);
        res.status(201).json({item: itemInsert});

    }
    catch(error){
        errorHandlerHttp(res,"ERROR_INSERT_ITEM");
    }

    
}

const updateItem = async (req:Request,res:Response) => {
    const {id} = req.params;
    const {body} = req;
    try{
        const item = await updateItemService(parseInt(id),body);
        res.status(200).json({item});

    }
    catch(error){
        errorHandlerHttp(res,"ERROR_UPDATE_ITEM");
    }

}

const deleteItem = async (req:Request,res:Response) => {
    const {id} = req.params;
    try{
        const item = await deleteItemService(parseInt(id));
        res.status(200).json({item});

    }
    catch(error){
        errorHandlerHttp(res,"ERROR_DELETE_ITEM");
    }
    
}

export {getItem,getItems,insertItem,updateItem,deleteItem}