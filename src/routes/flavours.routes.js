import { Router } from "express";
import { validateFlavour } from "../middlewares/validateFlavour.middleware.js";
import { postFlavour } from "../controllers/flavours.controller.js";

const flavoursRoute = Router();

flavoursRoute.post("/flavours", validateFlavour, postFlavour);

export default flavoursRoute;
