import express from "express";
import { registrar, autenticar } from "../controllers/UsuarioController.js";
const router = express.Router();

router.post('/', registrar); // Registrar usuario
router.post('/login', autenticar) // Auntenticar usuario

export default router