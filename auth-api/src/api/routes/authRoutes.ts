import {Router} from 'express';
import {registerCtlr,loginCtlr, verifyEmailCtlr,logoutCtlr,forgotPasswordCtlr,resetPasswordCtlr} from '../controllers/authController';

const router = Router();


router.post('/login',loginCtlr);

router.post('/register',registerCtlr)

router.post('/logout', logoutCtlr)
router.post('/verify-email', verifyEmailCtlr);
router.post('/forgot-password', forgotPasswordCtlr);
router.post('/reset-password/:token', resetPasswordCtlr);

export {router};