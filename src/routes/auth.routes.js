import { Router } from "express";
import {login,register,getUser} from '../controllers/auth.controller.js';
import {authRequired} from '../middlewares/validadeToken.js';
import {uploadImage} from '../middlewares/save.images.js';
const router= Router();

router.post('/register',uploadImage.single('photo_url'),register);
router.post('/login',login);
//--Para la de logout---

router .get('/user',authRequired,getUser)

export default router;




