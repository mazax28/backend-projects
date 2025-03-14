import { Router } from "express";
import { loginCtrl, registerCtrl,logoutCtrl } from "../controllers/authController";

const authRouter = Router();

authRouter.post('/login',loginCtrl)
authRouter.post('/register',registerCtrl)
authRouter.post('/logout',logoutCtrl)

export {authRouter}