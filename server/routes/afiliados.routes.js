import { Router } from "express";
import {getAfiliado, getAfiliados, createAfiliado, updateAfiliado, deleteAfiliado} from '../controllers/afiliados.controller.js'

const router = Router();

router.get('/afiliados', getClientes);

router.get('/afiliados/:id_afiliado', getCliente);

router.post('/afiliados', createCliente);

router.put('/afiliados', updateCliente);

router.delete('/afiliados/:id_usuario', deleteCliente);

export default router;