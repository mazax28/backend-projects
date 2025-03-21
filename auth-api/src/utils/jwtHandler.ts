import jwt from 'jsonwebtoken';
const {JWT_SECRET} = process.env;
const generateToken =  (id: string) =>{
    if(!JWT_SECRET){
        throw new Error('JWT_SECRET is not defined')
    }
    return  jwt.sign({id}, JWT_SECRET, {expiresIn: '1h'});
}

const veryfyToken = (token: string) => {
    if(!JWT_SECRET){
        throw new Error('JWT_SECRET is not defined')
    }
    return jwt.verify(token, JWT_SECRET);
}

export {generateToken, veryfyToken};