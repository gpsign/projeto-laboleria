import { Router } from "express";
import { validateOrder } from "../middlewares/validateOrder.middleware.js";
import { postOrder } from "../controllers/orders.controller.js";

const ordersRouter = Router();

ordersRouter.post("/order", validateOrder, postOrder);

export default ordersRouter;
