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
				'flavour', fl.name,
				'description', ca.description,
				'image', ca.image
			) AS cake,
			o.id AS "orderId", 
			o.isDelivered AS "isDelivered", 
			TO_CHAR(o.createdAt, 'YYYY-MM-DD HH24:MM') AS "createdAt",
			o.quantity,
			o.totalPrice AS "totalPrice"
		FROM orders o
		INNER JOIN clients cl ON o.clientId = cl.id
		INNER JOIN cakes ca ON o.cakeId = ca.id
		INNER JOIN flavours fl ON ca.flavourId = fl.id`;

export function selectOrders(date) {
	if (date)
		return db.query(
			`${orderQueryBody} WHERE CAST(TO_CHAR(o.createdAt, 'YYYY-MM-DD') AS TEXT) = $1 ORDER BY o.id;`,
			[date]
		);
	else return db.query(`${orderQueryBody} ORDER BY o.id;`);
}

export function selectOrderById(id) {
	return db.query(`${orderQueryBody} WHERE o.id = $1;`, [id]);
}

export function selectOrderByClientId(id) {
	return db.query(
		`
	SELECT 
		o.id AS "orderId", 
		o.isDelivered AS "isDelivered", 
		o.quantity, 
		TO_CHAR(o.createdAt, 'YYYY-MM-DD HH24:MM') AS "createdAt", 
		o.totalPrice AS "totalPrice", 
		c.name AS "cakeName", 
		f.name AS "cakeFlavour"
	FROM orders o
	INNER JOIN cakes c ON o.cakeId = c.id 
	INNER JOIN flavours f ON c.flavourId = f.id 
	WHERE o.clientId = $1
	ORDER BY o.id;`,
		[id]
	);
}

export function updateDelivered(id) {
	return db.query(`UPDATE orders o SET isDelivered = TRUE WHERE o.id = $1;`, [
		id,
	]);
}
