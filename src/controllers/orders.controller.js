import { insertOrder } from "../repositories/orders.repository.js";

export async function postOrder(req, res) {
	const order = req.body;
	try {
		await insertOrder(order);
		return res.sendStatus(201);
	} catch (error) {
		if (error.detail.includes("Key")) return res.status(404).send(error);
		else return res.status(400).send(error);
	}
}
