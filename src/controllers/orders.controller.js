import {
	insertOrder,
	selectOrders,
	selectOrderById,
	selectOrderByClientId,
} from "../repositories/orders.repository.js";

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

export async function getOrders(req, res) {
	const { date } = req.query;
	try {
		const orders = await selectOrders(date);
		if (!orders.rows[0]) return res.status(404).send([]);
		else return res.status(200).send(orders.rows);
	} catch (error) {
		console.log(error);
		return res.status(500).send(error);
	}
}

export async function getOrderById(req, res) {
	const { id } = req.params;
	try {
		const orders = await selectOrderById(id);
		if (!orders.rows[0]) return res.sendStatus(404);
		else return res.status(200).send(orders.rows);
	} catch (error) {
		console.log(error);
		return res.status(500).send(error);
	}
}

export async function getOrderByClientId(req, res){
	const { id } = req.params;
	try {
		const orders = await selectOrderByClientId(id);
		if (!orders.rows[0]) return res.sendStatus(404);
		else return res.status(200).send(orders.rows);
	} catch (error) {
		console.log(error);
		return res.status(500).send(error);
	}
}
