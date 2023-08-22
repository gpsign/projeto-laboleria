import { clientsSchema } from "../schemas/clients.schema.js";

export function validateClient(req, res, next){
    const validation = clientsSchema.validate(req.body, {
		abortEarly: false,
	});

	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		return res.status(400).send(errors);
	}

	next();
}