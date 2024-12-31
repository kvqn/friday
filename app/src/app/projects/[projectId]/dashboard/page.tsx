import { getLatestProjectLogs, getNamespaces } from "@/lib/queries"
import moment from "moment"

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const projectId = parseInt((await params).projectId)
  const logs = await getLatestProjectLogs({ projectId, limit: 20 })
  const namespaces = await getNamespaces(projectId)
  return (
    <div>
      <Logs logs={logs} namespaces={namespaces} />
    </div>
  )
}

function Logs({
  logs,
  namespaces,
}: {
  logs: Awaited<ReturnType<typeof getLatestProjectLogs>>
  namespaces: Awaited<ReturnType<typeof getNamespaces>>
}) {
  return (
    <table className="table-auto rounded-xl border">
      <thead className="border-b">
        <tr className="*:p-2">
          <th>Level</th>
          <th>Namespace</th>
          <th>Message</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {logs.map((log) => (
          <tr key={log.id} className="divide-x *:p-2">
            <td>{log.level}</td>
            <td>
              {namespaces.find((pred) => pred.id === log.namespaceId)!.name}
            </td>
            <td>{log.message}</td>
            <td>{moment(log.timestamp).format()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
