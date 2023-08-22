import { insertClient } from "../repositories/clients.repository.js";

export async function postClient(req, res) {
	const client = req.body;
	try {
		await insertClient(client);
		return res.sendStatus(201);
	} catch (error) {
		console.log(error);
		return res.status(400).send(error);
	}
}
