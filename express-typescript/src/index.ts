import express from 'express';
import cors from 'cors';
import { logMiddleware } from './middleware/Log';
import {checkSession} from './middleware/session';

import {itemRouter} from './routes/itemRoutes';
import { authRouter } from './routes/authRoutes';
import { orderRouter } from './routes/orderRoutes';


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use('/items',logMiddleware,itemRouter);
app.use('/auth',logMiddleware,authRouter);
app.use('/order',checkSession,orderRouter)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})