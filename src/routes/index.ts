import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import rp from "./registroPeso";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/rp", rp);

export default routes;