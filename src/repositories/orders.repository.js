import { db } from "../database/database.connection.js";

export function insertOrder(order) {
	const { clientId, cakeId, quantity, totalPrice } = order;
	return db.query(
		`INSERT INTO orders (clientId, cakeId, quantity, totalPrice) VALUES ($1, $2, $3, $4);`,
		[clientId, cakeId, quantity, totalPrice]
	);
}
