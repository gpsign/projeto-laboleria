import { getCakeByName, insertCake } from "../repositories/cakes.repository.js";

export async function postCake(req, res) {
	const cake = req.body;
	try {
		const duplicate = await getCakeByName(cake.name);
		if (duplicate.rows[0]) return res.sendStatus(409);
		await insertCake(cake);
		return res.sendStatus(201);
	} catch (error) {
		return res.status(400).send(error);
	}
}
