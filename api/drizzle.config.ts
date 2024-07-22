import { defineConfig } from "drizzle-kit"
import { env } from "./env"

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    host: env.MYSQL_HOST,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASS,
    database: env.MYSQL_DB,
  },
})
