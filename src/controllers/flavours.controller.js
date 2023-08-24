import {
	insertFlavour,
	selectFlavour,
} from "../repositories/flavours.repository.js";

export async function postFlavour(req, res) {
	const flavour = req.body;
	try {
		const duplicate = await selectFlavour(flavour);
		if (duplicate.rows[0]) return res.sendStatus(409);

		await insertFlavour(flavour);
		return res.sendStatus(201);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}
