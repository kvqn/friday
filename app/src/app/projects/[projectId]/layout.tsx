import { getProject } from "@/lib/queries"
import { Tab } from "./_components/tab"
import { notFound } from "next/navigation"

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  const project = await getProject(projectId)
  if (!project) notFound()
  return (
    <div>
      <h1 className="text-clash p-4 text-center text-3xl font-bold uppercase">
        {project.name}
      </h1>
      <div className="flex justify-center gap-4 bg-gray-50 px-8 py-2">
        <Tab href={`/projects/${projectId}/dashboard`} title="Dashboard" />
        <Tab href={`/projects/${projectId}/namespaces`} title="Namespaces" />
        <Tab href={`/projects/${projectId}/tokens`} title="Tokens" />
        <Tab href={`/projects/${projectId}/settings`} title="Settings" />
      </div>
      {children}
    </div>
  )
}
