import { flavoursSchema } from "../schemas/flavours.schema.js";

export function validateFlavour(req, res, next) {
	const validation = flavoursSchema.validate(req.body, {
		abortEarly: false,
	});

	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		return res.status(400).send(errors);
	}

	next();
}
