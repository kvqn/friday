import { getNamespaces } from "@/lib/queries"
import { CreateNamespace } from "./_components/create-namespace"

export default async function Page({
  params: { projectId },
}: {
  params: { projectId: string }
}) {
  const namespaces = await getNamespaces(parseInt(projectId))
  return (
    <div>
      namespaces
      {namespaces.map((namespace) => (
        <div key={namespace.id}>{namespace.name}</div>
      ))}
      <CreateNamespace projectId={parseInt(projectId)} />
    </div>
  )
}
