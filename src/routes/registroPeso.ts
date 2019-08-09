import { Router } from "express";
import RegistroPesoController from "../controllers/RegistroPesoController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

// obtiene todos los pesos
router.get("/", [checkJwt, checkRole(["ADMIN"])], RegistroPesoController.list);

//Create a new user
router.post("/", [checkJwt, checkRole(["ADMIN"])], RegistroPesoController.add);

export default router;