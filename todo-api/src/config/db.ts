import {connect} from 'mongoose';

const {MONGO_URI } = process.env;


const connectDB = async () => {
    try{
        if(!MONGO_URI){
            throw new Error('Mongo URI is missing');
        }
        await connect(MONGO_URI);
        console.log('Connected to the database');
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }


}

export { connectDB };