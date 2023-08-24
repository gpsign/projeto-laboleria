import { db } from "../database/database.connection.js";

export function selectFlavour(flavour) {
	const { name } = flavour;
	return db.query(`SELECT * FROM flavours WHERE name = $1;`, [name]);
}

export function insertFlavour(flavour) {
	const { name } = flavour;
	return db.query(`INSERT INTO flavours (name) VALUES ($1);`, [name]);
}
