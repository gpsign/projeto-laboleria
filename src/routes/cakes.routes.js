import { Router } from "express";
import { validateCake } from "../middlewares/validateCake.middleware.js";
import { postCake } from "../controllers/cakes.controller.js";

const cakesRouter = Router();

cakesRouter.post("/cakes", validateCake, postCake);

export default cakesRouter;
