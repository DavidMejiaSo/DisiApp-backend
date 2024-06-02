import { Router } from "express";
import {createConcert,getConcertById,deleteConcertById,getAllConcerts} from '../controllers/concert.controller.js';
import {authRequired} from '../middlewares/validadeToken.js';
import {uploadImage} from '../middlewares/save.images.js';
const router= Router();

router.post('/concert',authRequired,uploadImage.single('flyer_url'),createConcert); //Upload concert
router.get('/concert/:id',authRequired,getConcertById); //---Get concert by id
router.get('/concerts',authRequired,getAllConcerts); //Get all concerts
router.delete('/concert/:id',authRequired,deleteConcertById); //delete concert by id


export default router;




