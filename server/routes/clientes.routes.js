import { Router } from "express";
import { connectDB } from "../db.js";
import {getClientes, getCliente, createCliente, updateCliente, deleteCliente} from '../controllers/clientes.controller.js'

const router = Router();

router.get('/clientes', getClientes);

router.get('/clientes/:id', getCliente);

router.post('/clientes', createCliente);

router.put('/clientes', updateCliente);

router.delete('/clientes', deleteCliente);

export default router;