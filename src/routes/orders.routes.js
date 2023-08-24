import { Router } from "express";
import { validateOrder } from "../middlewares/validateOrder.middleware.js";
import {
	getOrderByClientId,
	getOrderById,
	getOrders,
	postOrder,
} from "../controllers/orders.controller.js";

const ordersRouter = Router();

ordersRouter.post("/order", validateOrder, postOrder);
ordersRouter.get("/orders", getOrders);
ordersRouter.get("/orders/:id", getOrderById);
ordersRouter.get("/:id/orders", getOrderByClientId);

export default ordersRouter;
