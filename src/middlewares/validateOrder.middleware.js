import { ordersSchema } from "../schemas/orders.schema.js";

export function validateCake(req, res, next){
    const validation = ordersSchema.validate(req.body, {
		abortEarly: false,
	});

	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		return res.status(422).send(errors);
	}

	next();
}