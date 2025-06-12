require("dotenv").config();
const isProduction = process.env.NODE_ENV === 'production';
export default {
    schema: "./db/schema.ts",
    out: "./migrations",
    // dialect: "turso",
    dialect: isProduction ? "turso" : "sqlite",
    dbCredentials: isProduction
        ? {
            url: process.env.TURSO_DATABASE_URL,
            authToken: process.env.TURSO_AUTH_TOKEN,
        }
        : {
            url: 'sqlite.db'
        },
};
