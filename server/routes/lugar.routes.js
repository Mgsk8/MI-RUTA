import { Router } from "express";
import { getLugar, getLugares, crearLugar, actualizarLugar, deleteLugar  } from "../controllers/lugar.controller.js";

const router = Router();

router.get('/lugares', getLugares);
router.get('/lugares/:id_lugar', getLugar);
router.post('/lugares', crearLugar);
router.patch('/lugares/:id_lugar', actualizarLugar);
router.delete('/lugares/:id_lugar', deleteLugar);

export default router;