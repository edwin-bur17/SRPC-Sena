import express from "express";
import { registrar } from "../controllers/UsuarioController.js";
const router = express.Router();

router.post('/', registrar);

export default router