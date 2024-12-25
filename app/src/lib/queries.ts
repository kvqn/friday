import { db } from "@/server/db"
import {
  finegrainedTokens,
  namespaces,
  projects,
  projectTokens,
} from "@/server/db/schema"
import { eq } from "drizzle-orm"

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
  const finegrained_tokens = await db
    .select()
    .from(finegrainedTokens)
    .where(eq(finegrainedTokens.projectId, projectId))

  return { project_tokens, finegrained_tokens }
}
