import { Router } from "express";
import { validateOrder } from "../middlewares/validateOrder.middleware.js";
import {
	getOrderByClientId,
	getOrderById,
	getOrders,
	patchOrder,
	postOrder,
} from "../controllers/orders.controller.js";

const ordersRouter = Router();

ordersRouter.post("/order", validateOrder, postOrder);
ordersRouter.get("/orders", getOrders);
ordersRouter.get("/orders/:id", getOrderById);
ordersRouter.get("/:id/orders", getOrderByClientId);
ordersRouter.patch("/order/:id", patchOrder);

export default ordersRouter;
