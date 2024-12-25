import { auth } from "@/server/auth"
import { db } from "@/server/db"
import { projects } from "@/server/db/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { CreateProject } from "./_components/create-project"
import Link from "next/link"

export default async function Page() {
  const session = await auth()
  if (!session) redirect("/signin")

  const user_projects = await db
    .select({
      id: projects.id,
      name: projects.name,
      description: projects.description,
    })
    .from(projects)
    .where(eq(projects.ownerId, session.user.id))

  return (
    <div>
      <div className="bg-gray-200 py-16">
        <h1 className="text-center text-3xl font-bold">Your Projects</h1>
      </div>
      <div className="flex flex-wrap gap-4 p-8">
        {user_projects.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id}>
            <div className="rounded-xl border p-4 transition-colors hover:bg-neutral-200">
              <div>{project.name}</div>
              <div>{project.description}</div>
            </div>
          </Link>
        ))}
      </div>
      <CreateProject />
    </div>
  )
}
