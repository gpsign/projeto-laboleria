import { Router } from "express";
import { validateClient } from "../middlewares/validateClient.middleware.js";
import { postClient } from "../controllers/clients.controller.js";

const clientsRouter = Router();

clientsRouter.post("/clients", validateClient, postClient);

export default clientsRouter;
