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
      .references(() => User.userId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    refreshTokenHash: text("refresh_token_hash").notNull(),
    createdAt: text("created_at").notNull(),
    expiresAt: text("expires_at"),
    lastUsedAt: text("last_used_at").notNull(),
  },
  (table) => [
    index("user_sessions_user_id_idx").on(table.userId),
    uniqueIndex("token_hash_idx").on(table.refreshTokenHash),
    index("persistent_clean_up_idx").on(table.expiresAt),
    index("session_clean_up_idx")
      .on(table.expiresAt, table.lastUsedAt)
      .where(isNull(table.expiresAt)),
  ]
);
