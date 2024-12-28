import { getNamespaces } from "@/lib/queries"
import { CreateNamespace } from "./_components/create-namespace"
import { NamespacesTable } from "./_components/table"

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const projectId = (await params).projectId
  const namespaces = await getNamespaces(parseInt(projectId))
  return (
    <div className="flex flex-col items-center p-8">
      <div className="w-[800px]">
        <h2 className="w-full text-left text-xl font-semibold">Namespaces</h2>
        <div className="flex flex-col items-center justify-center gap-4 p-4 px-16">
          {namespaces.length == 0 ? (
            <p>
              {
                "You don't have any namespaces. Create one using the button below."
              }
            </p>
          ) : (
            <NamespacesTable namespaces={namespaces} />
          )}
          <div className="flex w-full justify-end">
            <CreateNamespace projectId={parseInt(projectId)} />
          </div>
        </div>
      </div>
    </div>
  )
}
