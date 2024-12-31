import type { LevelSchema } from "@/app/api/logs/route"
import { db } from "@/server/db"
import {
  fgTokenNamespaces,
  finegrainedTokens,
  logs,
  namespaces,
  projects,
  projectTokens,
} from "@/server/db/schema"
import { and, count, desc, eq, gte, lte } from "drizzle-orm"
import type { z } from "zod"

export async function getProject(projectId: string) {
  return (
    (
      await db
        .select()
        .from(projects)
        .where(eq(projects.id, parseInt(projectId)))
        .limit(1)
    )[0] ?? null
  )
}

export async function getNamespaces(projectId: number) {
  return db.select().from(namespaces).where(eq(namespaces.projectId, projectId))
}

export async function getTokens(projectId: number) {
  const project_tokens = await db
    .select()
    .from(projectTokens)
    .where(eq(projectTokens.projectId, projectId))

  const finegrained_tokens = await Promise.all(
    (
      await db
        .select()
        .from(finegrainedTokens)
        .where(eq(finegrainedTokens.projectId, projectId))
    ).map((token) => {
      return (async () => {
        return {
          ...token,
          namespaces: await db
            .select({
              id: namespaces.id,
              name: namespaces.name,
            })
            .from(fgTokenNamespaces)
            .where(eq(fgTokenNamespaces.tokenId, token.id))
            .innerJoin(
              namespaces,
              eq(fgTokenNamespaces.namespaceId, namespaces.id),
            ),
        }
      })()
    }),
  )

  return { project_tokens, finegrained_tokens }
}

export async function getTokenScope(token: string) {
  const project = await db
    .select({ projectId: projectTokens.projectId })
    .from(projectTokens)
    .where(eq(projectTokens.token, token))
    .limit(1)
  if (project[0]?.projectId) {
    const projectId = project[0].projectId
    const project_namespaces = await db
      .select({ id: namespaces.id, name: namespaces.name })
      .from(namespaces)
      .where(eq(namespaces.projectId, projectId))
    const namespace_map = new Map<string, number>()
    for (const namespace of project_namespaces) {
      namespace_map.set(namespace.name, namespace.id)
    }
    return { projectId, namespaces: namespace_map }
  }

  const finegrained = await db
    .select({
      id: finegrainedTokens.id,
      projectId: finegrainedTokens.projectId,
    })
    .from(finegrainedTokens)
    .where(eq(finegrainedTokens.token, token))
    .limit(1)
  if (finegrained[0]) {
    const projectId = finegrained[0].projectId
    const project_namespaces = await db
      .select({ id: namespaces.id, name: namespaces.name })
      .from(fgTokenNamespaces)
      .where(eq(fgTokenNamespaces.tokenId, finegrained[0].id))
      .innerJoin(namespaces, eq(fgTokenNamespaces.namespaceId, namespaces.id))
    const namespace_map = new Map<string, number>()
    for (const namespace of project_namespaces) {
      namespace_map.set(namespace.name, namespace.id)
    }
    return { projectId, namespaces: namespace_map }
  }

  throw new Error("Invalid token")
}

export async function insertLog({
  namespaceId,
  message,
  level,
}: {
  namespaceId: number
  message: string
  level: z.infer<typeof LevelSchema>
}) {
  const logId = await db
    .insert(logs)
    .values({
      namespaceId,
      message,
      level,
    })
    .$returningId()
  return logId[0]!.id
}

export async function getLogs({
  namespaceId,
  from,
  to,
}: {
  namespaceId: number
  from: Date
  to?: Date
}) {
  return db
    .select()
    .from(logs)
    .where(
      and(
        eq(logs.namespaceId, namespaceId),
        gte(logs.timestamp, from),
        to ? lte(logs.timestamp, to) : undefined,
      ),
    )
    .orderBy(desc(logs.timestamp))
}

export async function getLogsCount({
  namespaceId,
  from,
  to,
}: {
  namespaceId: number
  from: Date
  to?: Date
}) {
  return (
    await db
      .select({ count: count() })
      .from(logs)
      .where(
        and(
          eq(logs.namespaceId, namespaceId),
          gte(logs.timestamp, from),
          to ? lte(logs.timestamp, to) : undefined,
        ),
      )
      .orderBy(desc(logs.timestamp))
  )[0]!.count
}

export async function getLatestNamespaceLogs({
  namespaceId,
  limit,
}: {
  namespaceId: number
  limit: number
}) {
  return await db
    .select()
    .from(logs)
    .where(eq(logs.namespaceId, namespaceId))
    .orderBy(desc(logs.timestamp))
    .limit(limit)
}

export async function getLatestProjectLogs({
  projectId,
  limit,
}: {
  projectId: number
  limit: number
}) {
  return (
    await db
      .select({
        logs,
      })
      .from(logs)
      .innerJoin(namespaces, eq(logs.namespaceId, namespaces.id))
      .where(eq(namespaces.projectId, projectId))
      .orderBy(desc(logs.timestamp))
      .limit(limit)
  ).map(({ logs }) => logs)
}
