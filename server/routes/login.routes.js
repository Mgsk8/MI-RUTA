import { Router } from "express";
import { connectDB } from "../db.js";
import {getLogin} from '../controllers/login.controller.js'

const router = Router();

router.post('/login', getLogin);

export default router;