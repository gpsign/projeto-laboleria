import { db } from "../database/database.connection.js";

export function insertOrder(order) {
	const { clientId, cakeId, quantity, totalPrice } = order;
	return db.query(
		`INSERT INTO orders (clientId, cakeId, quantity, totalPrice) VALUES ($1, $2, $3, $4);`,
		[clientId, cakeId, quantity, parseFloat(totalPrice).toFixed(2)]
	);
}

const orderQueryBody = `
	  SELECT
			json_build_object(
				'id', cl.id,
				'name', cl.name,
				'address', cl.address,
				'phone', cl.phone
			) AS client,
			json_build_object(
				'id', ca.id,
				'name', ca.name,
				'price', ca.price,
				'description', ca.description,
				'image', ca.image
			) AS cake,
			o.id AS "orderId",
			TO_CHAR(o.createdAt, 'YYYY-MM-DD HH24:MM') AS "createdAt",
			o.quantity,
			o.totalPrice AS "totalPrice"
		FROM orders o
		INNER JOIN clients cl ON o.clientId = cl.id
		INNER JOIN cakes ca ON o.cakeId = ca.id`;

export function selectOrders(date) {
	if (date)
		return db.query(
			`${orderQueryBody} WHERE CAST(TO_CHAR(o.createdAt, 'YYYY-MM-DD') AS TEXT) = $1;`,
			[date]
		);
	else return db.query(`${orderQueryBody};`);
}

export function selectOrderById(id) {
	return db.query(`${orderQueryBody} WHERE o.id = $1;`, [id]);
}

export function selectOrderByClientId(id) {
	return db.query(
		`
	SELECT 
		o.id AS "orderId", 
		o.quantity, 
		TO_CHAR(o.createdAt, 'YYYY-MM-DD HH24:MM') AS "createdAt", 
		o.totalPrice AS "totalPrice", 
		c.name AS "cakeName" 
	FROM orders o
	INNER JOIN cakes c ON o.cakeId = c.id 
	WHERE o.clientId = $1;`,
		[id]
	);
}
