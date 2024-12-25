"use server"

import { revalidatePath } from "next/cache"
import { auth } from "../auth"
import { db } from "../db"
import { projects } from "../db/schema"
import { eq, and } from "drizzle-orm"

export async function createProject({
  name,
  description,
}: {
  name: string
  description?: string
}) {
  const session = await auth()
  if (!session)
    return {
      status: "error" as const,
      message: "You are not allowed to perform that action",
    }

  if (name.length < 3)
    return {
      status: "error" as const,
      message: "Project name must be at least 3 characters",
    }

  const ownerId = session.user.id

  const projectExists = await db
    .select({ id: projects.id })
    .from(projects)
    .where(and(eq(projects.ownerId, ownerId), eq(projects.name, name)))
    .limit(1)

  if (projectExists.length)
    return {
      status: "error" as const,
      message: "A project with that name already exists",
    }

  const projectId = (
    await db
      .insert(projects)
      .values({
        name,
        description,
        ownerId,
      })
      .$returningId()
  )[0]!.id

  revalidatePath("/projects")
  return {
    status: "success" as const,
    message: "Project created",
    projectId: projectId,
  }
}
