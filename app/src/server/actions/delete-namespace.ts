"use server"

import { eq } from "drizzle-orm"
import { auth } from "../auth"
import { db } from "../db"
import { namespaces, projects } from "../db/schema"
import { revalidatePath } from "next/cache"

export async function deleteNamespace(namespaceId: number) {
  const session = await auth()
  if (!session)
    return {
      status: "error" as const,
      message: "You are not allowed to perform that action",
    }

  const namespace = await db
    .select({ projectId: namespaces.projectId })
    .from(namespaces)
    .where(eq(namespaces.id, namespaceId))
    .limit(1)

  if (!namespace[0])
    return {
      status: "error" as const,
      message: "Namespace not found",
    }

  const projectId = namespace[0].projectId

  const project = await db
    .select({ id: projects.id, ownerId: projects.ownerId })
    .from(projects)
    .where(eq(projects.id, projectId))
    .limit(1)
  if (!project[0])
    return {
      status: "error" as const,
      message: "Project not found",
    }

  if (session.user.id !== project[0].ownerId) {
    return {
      status: "error" as const,
      message: "You are not allowed to perform that action",
    }
  }
  await db.delete(namespaces).where(eq(namespaces.id, namespaceId))

  revalidatePath(`/projects/${projectId}/namespaces`)

  return {
    status: "success" as const,
    message: "Namespace deleted",
  }
}
