"use server"

import { and, eq } from "drizzle-orm"
import { db } from "../db"
import { namespaces, projects } from "../db/schema"
import { auth } from "../auth"
import { revalidatePath } from "next/cache"

export async function renameNamespace(namespaceId: number, name: string) {
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

  if (name.length < 3)
    return {
      status: "error" as const,
      message: "Namespace must be at least 3 characters",
    }

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

  await db
    .update(namespaces)
    .set({ name: name })
    .where(eq(namespaces.id, namespaceId))

  revalidatePath(`/projects/${projectId}/namespaces`)

  return {
    status: "success" as const,
    message: `Namespace renamed to ${name}`,
  }
}
