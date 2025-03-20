import { app } from './app';
import { connectDB } from './config/db';


const port = process.env.PORT || 8080;

connectDB();

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

