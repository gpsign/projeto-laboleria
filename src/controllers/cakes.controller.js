import { insertCake } from "../repositories/cakes.repository.js";

export async function postCake(req, res) {
	const cake = req.body;
	try {
		await insertCake(cake);
		return res.sendStatus(201);
	} catch (error) {
		if (error.detail.includes("is not present in table"))
			return res.status(404).send(error);
		else if (error.detail.includes("already exists."))
			return res.status(409).send(error);
		else return res.status(400).send(error);
	}
}
