import jwt from 'jsonwebtoken';
const {JWT_SECRET} = process.env


const generateToken = async (id:string) => {
    if (!JWT_SECRET){
        throw new Error('JWT_SECRET not defined')
    }

    const token = jwt.sign({id},JWT_SECRET,{expiresIn: '1h'});
    return token;
}


const verifyToken = (token:string) => {
    if (!JWT_SECRET){
        throw new Error('JWT_SECRET not defined')
    }
    const isOk = jwt.verify(token,JWT_SECRET);
    return  isOk;

}

export {generateToken, verifyToken}