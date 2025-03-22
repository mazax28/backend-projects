import { userModel } from "../models/userModel";



const getUsersService = async () => {
    return await userModel.find();  
}

export {getUsersService}