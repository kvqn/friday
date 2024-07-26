import { z } from "zod"
import {
  createLogSchema,
  getLogsSchema,
  getNamespacesSchema,
  getTopicsSchema,
} from "../zod-schemas"
import { db } from "./conn"
import { logs } from "./schema"
import { and, eq, gte, inArray, lte } from "drizzle-orm"

export async function createLog(log: z.infer<typeof createLogSchema>) {
  console.log("Creating log")
  await db.insert(logs).values(log)
}

export async function getLogs(query: z.infer<typeof getLogsSchema>) {
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

export async function getNamespaces(
  query: z.infer<typeof getNamespacesSchema>,
) {
  console.log("getNamespaces")
  return (
    await db.selectDistinct({ namespace: logs.namespace }).from(logs)
  ).map((row) => row.namespace)
}

export async function getTopics(query: z.infer<typeof getTopicsSchema>) {
  console.log("getTopics")
  return (
    await db
      .selectDistinct({ topic: logs.topic })
      .from(logs)
      .where(eq(logs.namespace, query.namespace))
  ).map((row) => row.topic)
}
