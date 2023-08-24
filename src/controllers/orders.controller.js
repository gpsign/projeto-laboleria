import {
	insertOrder,
	selectOrders,
	selectOrderById,
	selectOrderByClientId,
	updateDelivered,
} from "../repositories/orders.repository.js";

export async function postOrder(req, res) {
	const order = req.body;
	try {
		await insertOrder(order);
		return res.sendStatus(201);
	} catch (error) {
		if (error.detail.includes("is not present in table"))
			return res.status(404).send(error);
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
	const id = Number(req.params.id);
	try {
		if (!id) return res.sendStatus(400);
		const orders = await selectOrderById(id);
		if (!orders.rows[0]) return res.sendStatus(404);
		else return res.status(200).send(orders.rows);
	} catch (error) {
		console.log(error);
		return res.status(500).send(error);
	}
}

export async function getOrderByClientId(req, res) {
	const id = Number(req.params.id);
	try {
		if (!id) return res.sendStatus(400);
		const orders = await selectOrderByClientId(id);
		if (!orders.rows[0]) return res.sendStatus(404);
		else return res.status(200).send(orders.rows);
	} catch (error) {
		console.log(error);
		return res.status(400).send(error);
	}
}

export async function patchOrder(req, res) {
	const id = Number(req.params.id);
	try {
		if (!id) return res.sendStatus(400);
		const updated = await updateDelivered(id);
		if (!updated.rowCount) return res.sendStatus(404);
		return res.sendStatus(204);
	} catch (error) {
		console.log(error);
		if (error.detail.includes("is not present in table"))
			return res.status(404).send(error);
		else return res.status(400).send(error);
	}
}
