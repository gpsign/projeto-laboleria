import { db } from "../database/database.connection.js";

export function insertCake(cake) {
	const { name, price, flavourId, image, description } = cake;

	return db.query(
		`INSERT INTO cakes (name, price, flavourId, image, description) VALUES ($1, $2, $3, $4, $5);`,
		[name, parseFloat(price).toFixed(2), flavourId, image, description]
	);
}
