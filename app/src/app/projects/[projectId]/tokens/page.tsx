import { getNamespaces, getTokens } from "@/lib/queries"
import { CreateProjectToken } from "./_components/create-project-token"
import { ProjectTokensTable } from "./_components/project-tokens-table"
import { FinegranedTokensTable } from "./_components/finegrained-tokens-table"
import { CreateFinegrainedToken } from "./_components/create-finegrained-token"

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  const tokens = await getTokens(parseInt(projectId))
  const namespaces = await getNamespaces(parseInt(projectId))
  return (
    <div className="flex flex-col items-center p-8">
      <div className="w-5/6">
        <h2 className="w-full text-left text-xl font-bold">Tokens</h2>
        <h3 className="text-lg font-semibold">Project Tokens</h3>
        <div className="flex flex-col items-center justify-center gap-4 p-4 px-16">
          {tokens.project_tokens.length == 0 ? (
            <p>
              {
                "You don't have any project tokens. Create one using the button below."
              }
            </p>
          ) : (
            <ProjectTokensTable tokens={tokens.project_tokens} />
          )}
          <CreateProjectToken projectId={parseInt(projectId)} />
        </div>
        <h3 className="text-lg font-semibold">Fine-Grained Tokens</h3>
        <div className="flex flex-col items-center justify-center gap-4 p-4 px-16">
          {tokens.finegrained_tokens.length == 0 ? (
            <p>
              {
                "You don't have any fine grained tokens. Create one using the button below."
              }
            </p>
          ) : (
            <FinegranedTokensTable
              tokens={tokens.finegrained_tokens}
              namespaces={namespaces}
            />
          )}
          <CreateFinegrainedToken
            projectId={parseInt(projectId)}
            namespaces={namespaces}
          />
        </div>
      </div>
    </div>
  )
}
