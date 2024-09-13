import { Router } from "express";
import { connectDB } from "../db.js";
import {getUsuarios, getUsuario, getLogin, createUsuario, updateUsuario, cambiarEstadoUsuario, deleteUsuario} from '../controllers/usuarios.controller.js'

const router = Router();

router.get('/usuarios', getUsuarios);

router.get('/usuarios/:id_usuario', getUsuario);

router.get('/usuarios/:email/:password', getLogin);

router.post('/usuarios', createUsuario);

router.patch('/usuarios/:id_usuario', updateUsuario);

router.delete('/usuarios/:id_usuario', deleteUsuario);

export default router;