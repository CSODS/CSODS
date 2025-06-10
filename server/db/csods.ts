import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from './schema.js';
import dotenv from "dotenv"
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
    const turso = createTursoClient();
    await turso.execute('PRAGMA foreign_keys=ON;');

    const csodsContext = drizzle({client: turso, schema});

    return csodsContext;
}

// const turso = createClient({
//     url: process.env.TURSO_DATABASE_URL!,
//     authToken: process.env.TURSO_AUTH_TOKEN,
// });

// turso.execute('PRAGMA foreign_keys=ON;');

// const csodsContext = drizzle({client: turso, schema});

// export {turso, csodsContext}