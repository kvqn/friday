import {
  char,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/mysql-core"

export const logs = mysqlTable("logs", {
  id: serial("id").primaryKey(),
  namespace: char("namespace", { length: 128 }).default("default").notNull(),
  topic: char("topic", { length: 128 }).default("default").notNull(),
  level: mysqlEnum("level", ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"])
    .default("INFO")
    .notNull(),
  data: text("data"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
})
