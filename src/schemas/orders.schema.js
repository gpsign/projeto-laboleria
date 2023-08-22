import joi from "joi";

export const ordersSchema = joi.object({
	clientId: joi.number().integer().min(1).required(),
	cakeId: joi.number().integer().min(1).required(),
	quantity: joi.number().integer().min(1).max(4).required(),
    totalPrice: joi.number().required().precision(2),
});
