require("dotenv").config();

import type { Config } from "drizzle-kit";

const isProduction = process.env.NODE_ENV === 'production';

export default {
  schema: "./dist/db/schema.js",
  out: "./migrations",
  // dialect: "turso",
  dialect: isProduction ? "turso" : "sqlite",
  dbCredentials: isProduction
  ? { 
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  } 
  : {
    url: 'sqlite.db'
  },
} satisfies Config;