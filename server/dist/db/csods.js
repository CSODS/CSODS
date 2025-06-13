var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { drizzle as drizzleTurso } from "drizzle-orm/libsql";
import { drizzle as drizzleLocal } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { createClient } from "@libsql/client";
import * as schema from './schema.js';
import dotenv from "dotenv";
dotenv.config();
let tursoClient = null;
function createTursoClient() {
    if (!tursoClient) {
        tursoClient = createClient({
            url: process.env.TURSO_DATABASE_URL,
            authToken: process.env.TURSO_AUTH_TOKEN,
        });
    }
    return tursoClient;
}
export function createContext() {
    return __awaiter(this, void 0, void 0, function* () {
        //  if node environment is production, use turso
        if (process.env.NODE_ENV === 'production') {
            const turso = createTursoClient();
            yield turso.execute('PRAGMA foreign_keys=ON;');
            return drizzleTurso({ client: turso, schema });
        }
        //  if node environment is testing, use local db
        else {
            const sqlite = new Database('sqlite.db');
            sqlite.exec('PRAGMA foreign_keys=ON;');
            return drizzleLocal({ client: sqlite, schema });
        }
    });
}
