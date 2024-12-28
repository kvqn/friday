import { getTokens } from "@/lib/queries"
import { CreateProjectToken } from "./_components/create-project-token"
import { ProjectTokensTable } from "./_components/project-tokens-table"

export default async function Page({
  params: { projectId },
}: {
  params: { projectId: string }
}) {
  const tokens = await getTokens(parseInt(projectId))
  return (
    <div className="flex flex-col items-center p-8">
      <div className="w-4/5">
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
            <p>{JSON.stringify(tokens.finegrained_tokens)}</p>
          )}
          <div className="flex w-full justify-end">create</div>
        </div>
      </div>
    </div>
  )
}
