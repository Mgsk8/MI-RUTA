import { Router } from "express";
import {getClientes, getCliente, createCliente, updateCliente, deleteCliente} from '../controllers/clientes.controller.js'

const router = Router();

router.get('/clientes', getClientes);

router.get('/clientes/:id_cliente', getCliente);

router.post('/clientes', createCliente);

router.put('/clientes', updateCliente);

router.delete('/clientes/:id_usuario', deleteCliente);

export default router;