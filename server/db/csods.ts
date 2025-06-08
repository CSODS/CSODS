import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import dotenv from "dotenv"
dotenv.config()

const turso = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

turso.execute('PRAGMA foreign_keys=ON;');

const csodsContext = drizzle(turso);

export {turso, csodsContext}