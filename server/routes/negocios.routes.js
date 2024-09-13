import { Router } from "express";
import { getNegocio, getNegocios, crearNegocio, actualizarNegocio, deleteNegocio  } from "../controllers/negocios.controller.js";

const router = Router();

router.get('/negocios', getNegocios);
router.get('/negocios/: id_lugar', getNegocio);
router.post('/negocios', crearNegocio);
router.put('/negocios/: id_lugar', actualizarNegocio);
router.delete('/negocios/: id_lugar', deleteNegocio);

export default router;