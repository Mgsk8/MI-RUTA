import { Router } from "express";
import { connectDB } from "../db.js";
import {getUsuarios, getUsuario, getLogin, createUsuario, updateUsuario, deletetUsuario} from '../controllers/usuarios.controller.js'

const router = Router();

router.get('/usuarios', getUsuarios);

router.get('/usuarios/:id', getUsuario);

router.get('/usuarios/:email/:password', getLogin);

router.post('/usuarios', createUsuario);

router.put('/usuarios', updateUsuario);

router.delete('/usuarios/:id', deletetUsuario);

export default router;