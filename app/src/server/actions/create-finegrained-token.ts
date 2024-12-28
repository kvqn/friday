"use server"

import { eq } from "drizzle-orm"
import { auth } from "../auth"
import { db } from "../db"
import {
  fgTokenNamespaces,
  finegrainedTokens,
  projects,
  projectTokens,
} from "../db/schema"
import { randomToken } from "@/lib/utils"
import { revalidatePath } from "next/cache"

export async function createFinegrainedToken({
  projectId,
  description,
  namespaces,
}: {
  projectId: number
  description?: string
  namespaces: number[]
}) {
  const session = await auth()
  if (!session) {
    return { status: "error", message: "You are not allowed to do this." }
  }

  const project = await db
    .select({ ownerId: projects.ownerId })
    .from(projects)
    .where(eq(projects.id, projectId))
    .limit(1)
  if (!project[0]) {
    return { status: "error", message: "Project not found." }
  }

  const ownerId = project[0].ownerId
  if (ownerId !== session.user.id) {
    return { status: "error", message: "You are not allowed to do this." }
  }

  const token = randomToken()
  const _generated_token_id = (
    await db
      .insert(finegrainedTokens)
      .values({
        projectId,
        token,
        description,
      })
      .$returningId()
  )[0]
  if (!_generated_token_id) {
    return { status: "error", message: "Failed to create token." }
  }
  const generated_token_id = _generated_token_id.id

  await db.insert(fgTokenNamespaces).values(
    namespaces.map((namespaceId) => ({
      tokenId: generated_token_id,
      namespaceId,
    })),
  )

  revalidatePath(`/projects/${projectId}/tokens`)

  return { status: "success", message: "Token created." }
}
