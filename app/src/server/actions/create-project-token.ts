"use server"

import { eq } from "drizzle-orm"
import { auth } from "../auth"
import { db } from "../db"
import { projects, projectTokens } from "../db/schema"
import { randomToken } from "@/lib/utils"
import { revalidatePath } from "next/cache"

export async function createProjectToken({
  projectId,
  description,
}: {
  projectId: number
  description?: string
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
  await db.insert(projectTokens).values({
    projectId,
    token,
    description,
  })

  revalidatePath(`/projects/${projectId}/tokens`)

  return { status: "success", message: "Token created." }
}
