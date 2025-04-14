import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: ".env" }); // or .env.local

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error("DATABASE_URL is not set in the environment.");
}

export const db = drizzle(databaseUrl);
