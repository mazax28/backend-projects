import {Router} from 'express';
import {getOrdersCtrl} from '../controllers/orderController';

const orderRouter = Router();

orderRouter.get('/',getOrdersCtrl);



export {orderRouter}