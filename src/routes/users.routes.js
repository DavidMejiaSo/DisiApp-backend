import { Router } from "express";
import {getUserById,getAllUsers,deleteUserById} from '../controllers/users.controller.js';
import {authRequired} from '../middlewares/validadeToken.js';
const router= Router();

//Gets
router.get('/userById/:id',authRequired,getUserById)
router.get('/users',authRequired,getAllUsers)
//---deletes

router.delete('/userById/:id',authRequired,deleteUserById)

export default router;

