import {sign, verify} from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET

async function generateToken(id:string){
    if (!JWT_SECRET){
        throw new Error('JWT_SECRET not defined')
    }
    const jwt = sign({id},JWT_SECRET,{expiresIn: '1h'});
    return jwt;

}

function verifyToken(token:string){
    if (!JWT_SECRET){
        throw new Error('JWT_SECRET not defined')
    }
    const isOk = verify(token,JWT_SECRET);
    return  isOk;

}

export {generateToken, verifyToken}