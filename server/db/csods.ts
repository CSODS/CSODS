import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import dotenv from "dotenv"
dotenv.config()

const turso = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

const csodsContext = drizzle(turso);

export {turso, csodsContext}