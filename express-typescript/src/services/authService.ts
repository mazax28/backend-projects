import type { User } from "@prisma/client"
import bcrypt from "bcryptjs"
import { prisma } from "../prismaClient"
import { sign } from "jsonwebtoken"
import { generateToken } from "../utils/jwtHandler"
async function registerNewUser(user: User) {
    const existingUser = await prisma.user.findUnique({
        where:{
            email: user.email
        }
    })
    if(existingUser){
        throw new Error("User already exists")
    }
    const hashedPassword = await bcrypt.hash(user.password, 8)
    const userCreate= await prisma.user.create({
        data: {
            ...user,
            password: hashedPassword
        }
    })
    const {password, ...userWithoutPassword} = userCreate
    return userWithoutPassword
    
}


async function loginUser(user:User) {
    const userFound = await prisma.user.findUnique({
        where:{
            email: user.email
        }
    })
    if(!userFound){
        throw new Error("User not found")
    }
    const passwordIsValid = await bcrypt.compare(user.password, userFound.password)
    if(!passwordIsValid){
        throw new Error("Invalid password")
    }
    const jwt_token = await generateToken(userFound.id.toString())
    return {...userFound, token: jwt_token}
}


export { registerNewUser, loginUser }