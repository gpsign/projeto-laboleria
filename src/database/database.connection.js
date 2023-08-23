import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const config = {
	connectionString: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV === "production") config.ssl = true;

pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value) => {
	return parseFloat(value);
});

export const db = new Pool(config);
