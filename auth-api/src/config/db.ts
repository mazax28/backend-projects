import {connect} from 'mongoose';
import { handleInfo, handleError } from '../utils/eventHandlers';


const {MONGO_URI}  = process.env;


const connectDB = async () => {
    try{
        if(!MONGO_URI){
            throw new Error('Mongo URI is missing');
        }
        await connect(MONGO_URI);
        handleInfo('Connected to the database');

    }
    catch(err){
        handleError(err as Error);
        process.exit(1);
    }

}

export {connectDB};