import { drizzle as drizzleTurso } from "drizzle-orm/libsql";
import { drizzle as drizzleLocal } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { createClient } from "@libsql/client";
import * as schema from '@models';
import dotenv from "dotenv";
dotenv.config()

let tursoClient: ReturnType<typeof createClient> | null = null;

function createTursoClient() {
    if (!tursoClient) {
        tursoClient = createClient({
            url: process.env.TURSO_DATABASE_URL!,
            authToken: process.env.TURSO_AUTH_TOKEN,
        });
    }
    return tursoClient;
}

export async function createContext() {
    //  if node environment is production, use turso
    if (process.env.NODE_ENV === 'production') {
        const turso = createTursoClient();
        await turso.execute('PRAGMA foreign_keys=ON;');
        return drizzleTurso({client: turso, schema});
    }
    //  if node environment is testing, use local db
    else {
        const sqlite = new Database('sqlite.db');
        sqlite.exec('PRAGMA foreign_keys=ON;');

        return drizzleLocal({client: sqlite, schema});
    }
}

export type DbContext = Awaited<ReturnType<typeof createContext>>;