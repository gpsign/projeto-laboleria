import { db } from "../database/database.connection.js";

export function insertCake(cake) {
	const { name, price, image, description } = cake;

	return db.query(
		`INSERT INTO cakes (name, price, image, description) VALUES ($1, $2, $3, $4);`,
		[name, price, image, description]
	);
}

export function getCakeByName(name) {
	return db.query(`SELECT * FROM cakes WHERE name = $1;`, [name]);
}
