import { Router } from "express"; 
import {addTimeEntry,deleteTimeEntry,getTimeEntries,getAllAgendas} from '../controllers/agenda.controller.js';
import {authRequired} from '../middlewares/validadeToken.js';

const router= Router();

router.post('/user-agenda',authRequired,addTimeEntry);


router.delete('/user-agenda/:id', authRequired,deleteTimeEntry);

// Obtener todas las entradas de tiempo de un usuario
router.get('/user-agendas', authRequired,getTimeEntries);

// Obtener todas las listas de tiempos de todos los usuarios
router.get('/all-users-agendas', authRequired,getAllAgendas);



export default router;




