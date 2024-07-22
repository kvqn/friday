import {
  char,
  json,
  mysqlEnum,
  mysqlTable,
  serial,
  timestamp,
} from "drizzle-orm/mysql-core"

export const logs = mysqlTable("logs", {
  id: serial("id").primaryKey(),
  namespace: char("namespace", { length: 128 }).default("default"),
  topic: char("topic", { length: 128 }).default("default"),
  level: mysqlEnum("level", [
    "DEBUG",
    "INFO",
    "WARNING",
    "ERROR",
    "CRITICAL",
  ]).default("INFO"),
  data: json("data"),
  timestamp: timestamp("timestamp").defaultNow(),
})
