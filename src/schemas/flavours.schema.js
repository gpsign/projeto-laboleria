import joi from "joi";

export const flavoursSchema = joi.object({
	name: joi.string().required().min(2),
});
