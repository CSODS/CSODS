import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { User } from "./user";
import { isNull } from "drizzle-orm";

export const UserSession = sqliteTable(
  "user_sessions",
  {
    sessionId: integer("session_id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => User.userId, { onDelete: "cascade" }),
    refreshTokenHash: text("refresh_token_hash").notNull(),
    createdAt: text("created_at"),
    expiresAt: text("expires_at"),
    lastUsedAt: text("last_used_at"),
  },
  (table) => [
    uniqueIndex("token_hash_idx").on(table.refreshTokenHash),
    index("persistent_clean_up_idx").on(table.expiresAt),
    index("session_clean_up_idx")
      .on(table.expiresAt, table.lastUsedAt)
      .where(isNull(table.expiresAt)),
  ]
);
