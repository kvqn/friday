import { getLogs } from "@/server/actions/getLogs"

export async function Logs() {
  const logs = await getLogs()
  return (
    <div>
      Logs
      {JSON.stringify(logs)}
    </div>
  )
}
