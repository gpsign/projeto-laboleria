import joi from "joi";

export const ordersSchema = joi.object({
    clientId: joi.number().integer().min(1),
    cakeId: joi.number().integer().min(1),
    quantity: joi.number().integer().min(1).max(5),
})