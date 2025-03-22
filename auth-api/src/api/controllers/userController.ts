import type {Request, Response} from 'express';
import {getUsersService} from '../services/userService';




const getUsersCtlr = async (req: Request, res: Response) => {
    try {
        const users = await getUsersService();
        res.status(200).json({users});
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }


}

const getUserCtlr = async (req: Request, res: Response) => {


}


const createUserCtlr = async (req: Request, res: Response) => {


}


const updateUserCtlr = async (req: Request, res: Response) => {


}

const deleteUserCtlr = async (req: Request, res: Response) => {


}

export {getUsersCtlr, getUserCtlr, createUserCtlr, updateUserCtlr, deleteUserCtlr}