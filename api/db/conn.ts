import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"
import { env } from "../env"

export const connection = await mysql.createConnection({
  host: env.MYSQL_HOST,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASS,
  database: env.MYSQL_DB,
})

export const db = drizzle(connection)
