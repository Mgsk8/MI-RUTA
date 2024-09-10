import { Router } from "express";
import { connectDB } from "../db.js";
import {getUsuarios, createUsuarios, updateUsuarios, deletetUsuarios} from '../controllers/usuarios.controller.js'

const router = Router();

router.get('/usuarios', getUsuarios);

router.post('/usuarios', createUsuarios);

router.put('/usuarios', updateUsuarios);

router.delete('/usuarios', deletetUsuarios);

export default router;