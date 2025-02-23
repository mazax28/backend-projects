import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createUser(){
    const newUser = await prisma.user.create({
        data:{
            name: "Alice",
            email: "ale@gmail.com",
            lastName: "Doe",  
        }
    })
    if(newUser){
        console.log("User created successfully", newUser)
    }
    else{
        console.log("User creation failed")
    }
}

async function listUsers(){
   const users = await prisma.user.findMany()
   console.log(users)
}

async function firstUser(username){
    const user =  await prisma.user.findFirst({
        where:{
            OR:[
                {name: username},
                {email: username}
            ]
        }
    })
    console.log(user)
}

async function deleteUser(username){
    const user  = await prisma.user.delete({
        where:{
            name: username
        }
    })

    console.log(user)
}
async function updateUser(id, data){
    const user = await prisma.user.update({
        where:{
            id: id
        },
        data:{
            ...data
        }
    })
    console.log(user)

}
main()