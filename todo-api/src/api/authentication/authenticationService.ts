import type { Register, Login } from "./authenticationModel";
import { userModel } from "./authenticationModel";
import { generateToken } from "../../utils/jwtHandler";
import bcrypt from 'bcryptjs';



const registerService = async (data: Register) => {
    const user = structuredClone(data);
    user.password = await bcrypt.hash(data.password, 10);
    const newUser = await userModel.create(user);
    const token = await generateToken(newUser._id.toString());
    return { user: newUser, token };

}


const loginService = async (data: Login) => {
    const user = await userModel
        .findOne({ email: data.email })
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    const isOk = await bcrypt.compare(data.password, user.password);
    if (!isOk) {
        throw new Error('Contraseña incorrecta');
    }
    const token = await generateToken(user._id.toString());
    return { user, token };
}


export { registerService, loginService };