// Este es el encargado de realizar la logiga de negocio de los items
import type {Item} from '@prisma/client'
import {prisma} from '../prismaClient'

async function getItemsService (){
    return await prisma.item.findMany()
}
async function insertItemService(item:Item){
    return await prisma.item.create({
        data: item
    })
}

async function getItemService(id: number){
    return await prisma.item.findUnique({
        where: {
            id: id
        }
    })
}

async function updateItemService(id: number,item:Item){ 
    return await prisma.item.update({
        where: {
            id: id
        },
        data: item
    })
}

async function deleteItemService(id: number){
    return await prisma.item.delete({
        where: {
            id: id
        }
    })
}

export {getItemsService, insertItemService, updateItemService, deleteItemService,getItemService}