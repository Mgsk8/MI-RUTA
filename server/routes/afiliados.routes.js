import { Router } from "express";
import {getAfiliado, getAfiliados, createAfiliado, updateAfiliado, deleteAfiliado} from '../controllers/afiliados.controller.js'

const router = Router();

router.get('/afiliados', getAfiliados);

router.get('/afiliados/:id_afiliado', getAfiliado);

router.post('/afiliados', createAfiliado);

router.put('/afiliados', updateAfiliado);

router.delete('/afiliados/:id_usuario', deleteAfiliado);

export default router;