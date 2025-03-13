import { Router } from "express";
import {getItem, getItems, insertItem, updateItem,deleteItem}  from "../controllers/itemController";
export const itemRouter = Router();


itemRouter.get('/',getItems)

itemRouter.get('/:id',getItem)

itemRouter.post('/',insertItem)

itemRouter.put('/:id',updateItem)

itemRouter.delete('/:id',deleteItem)