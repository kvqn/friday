"use server"

import { revalidatePath } from "next/cache"
import { auth } from "../auth"
import { db } from "../db"
import { namespaces, projects } from "../db/schema"
import { eq, and } from "drizzle-orm"

export async function createNamespace({
  projectId,
  name,
}: {
  projectId: number
  name: string
}) {
  const session = await auth()
  if (!session)
    return {
      status: "error" as const,
      message: "You are not allowed to perform that action",
    }

  const project = await db
    .select({ id: projects.id })
    .from(projects)
    .where(eq(projects.id, projectId))
    .limit(1)
  if (!project.length)
    return {
      status: "error" as const,
      message: "Project not found",
    }

  if (name.length < 3)
    return {
      status: "error" as const,
      message: "Namespace must be at least 3 characters",
    }

  const ownerId = session.user.id

  const namespaceExists = await db
    .select({ id: namespaces.id })
    .from(namespaces)
    .where(and(eq(namespaces.projectId, projectId), eq(namespaces.name, name)))
    .limit(1)

  if (namespaceExists.length)
    return {
      status: "error" as const,
      message: "That namespace already exists",
    }

  await db.insert(namespaces).values({ projectId, name })

  revalidatePath(`/projects/${projectId}/namespaces`)
  return {
    status: "success" as const,
    message: "Namespace created",
  }
}
