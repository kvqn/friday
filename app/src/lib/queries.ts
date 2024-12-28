import { db } from "@/server/db"
import {
  fgTokenNamespaces,
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
