"use server"

import { eq } from "drizzle-orm"
import { auth } from "../auth"
import { db } from "../db"
import { projects, projectTokens } from "../db/schema"
import { revalidatePath } from "next/cache"
import { randomToken } from "@/lib/utils"

export async function deleteProjectToken(tokenId: number) {
  const session = await auth()
  if (!session) {
    return { status: "error", message: "Not authenticated" }
  }

  const token = await db
    .select({ projectId: projectTokens.projectId })
    .from(projectTokens)
    .where(eq(projectTokens.id, tokenId))
    .limit(1)
  if (!token[0]) {
    return { status: "error", message: "Token not found" }
  }

  const projectId = token[0].projectId
  const project = await db
    .select({ ownerId: projects.ownerId })
    .from(projects)
    .where(eq(projects.id, projectId))
    .limit(1)
  if (!project[0]) {
    return { status: "error", message: "Project not found" }
  }

  const ownerId = project[0].ownerId
  if (ownerId !== session.user.id) {
    return { status: "error", message: "Unauthorized" }
  }

  await db.delete(projectTokens).where(eq(projectTokens.id, tokenId))

  revalidatePath(`/projects/${projectId}/tokens`)

  return {
    status: "success",
    message: "Regenerated token",
  }
}
