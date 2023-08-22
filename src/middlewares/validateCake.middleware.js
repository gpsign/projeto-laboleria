import { cakesSchema } from "../schemas/cakes.schema.js";

export function validateCake(req, res, next) {
	const validation = cakesSchema.validate(req.body, {
		abortEarly: false,
	});

	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		return res.status(400).send(errors);
	}

	next();
}
