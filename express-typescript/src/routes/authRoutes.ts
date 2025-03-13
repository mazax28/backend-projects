import { Router } from "express";
import { loginCtrl, registerCtrl } from "../controllers/authController";

const authRouter = Router();

authRouter.post('/login',loginCtrl)
authRouter.post('/register',registerCtrl)

export {authRouter}