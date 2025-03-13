import {prisma} from '../prismaClient'


async function getOrdersService(){
    try{
        return await prisma.order.findMany();
    }
    catch(error){
        throw new Error("ERROR_GET_ORDERS");
    }


}