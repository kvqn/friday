import { z } from "zod"
import { logInputSchema, querySchema } from "../zod-schemas"
import { db } from "./conn"
import { logs } from "./schema"
import { and, eq, gte, inArray, lte } from "drizzle-orm"

export async function createLog(log: z.infer<typeof logInputSchema>) {
  console.log("Creating log")
  await db.insert(logs).values(log)
}

export async function queryLog(query: z.infer<typeof querySchema>) {
  console.log("Query log")
  return await db
    .select()
    .from(logs)
    .where(
      and(
        query.after ? gte(logs.timestamp, query.after) : undefined,
        query.before ? lte(logs.timestamp, query.before) : undefined,
        query.level ? eq(logs.level, query.level) : undefined,
        query.namespaces
          ? inArray(logs.namespace, query.namespaces)
          : undefined,
        query.topics ? inArray(logs.topic, query.topics) : undefined,
      ),
    )
    .limit(query.limit ?? 100)
}
