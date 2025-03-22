import {Router} from 'express';
import {getUsersCtlr, getUserCtlr, createUserCtlr, updateUserCtlr, deleteUserCtlr} from '../controllers/userController';

const router = Router();


router.get('/', getUsersCtlr);
router.get('/:id', getUserCtlr);
router.post('/', createUserCtlr);
router.put('/:id', updateUserCtlr);
router.delete('/:id', deleteUserCtlr);

export {router};