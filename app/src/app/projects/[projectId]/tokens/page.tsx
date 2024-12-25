import { getTokens } from "@/lib/queries"

export default async function Page({
  params: { projectId },
}: {
  params: { projectId: string }
}) {
  const tokens = await getTokens(parseInt(projectId))
  return (
    <div>
      tokens
      {JSON.stringify(tokens)}
    </div>
  )
}
