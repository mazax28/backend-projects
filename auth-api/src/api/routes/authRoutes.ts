import {Router} from 'express';


const router = Router();


router.post('/login', (req, res) => {

    res.send('Login');
}
);

router.post('/register', (req, res) => {
    
    res.send('Register');
})

router.post('/logout', (req, res) => {

    res.send('Logout');
}
);



export {router};