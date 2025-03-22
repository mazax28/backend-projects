import {Router} from 'express';
import {registerCtlr,loginCtlr} from '../controllers/authController';

const router = Router();

router.get('/', (req, res) => {
    res.send('Auth API');

})
router.post('/login',loginCtlr);

router.post('/register',registerCtlr)

router.post('/logout', (req, res) => {

    res.send('Logout');
}
);



export {router};