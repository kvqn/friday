"use client"

import { useFilters } from "./filters"
import { useEffect, useState } from "react"
import { Log } from "./log"
import { aggregator } from "@/lib/actions/aggregator"

export function Logs() {
  const { query } = useFilters()
  const [logs, setLogs] = useState<
    Awaited<ReturnType<typeof aggregator.logs>>[number][]
  >([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    void (async () => {
      const _logs = await aggregator.logs(query)
      console.log("logs", _logs)
      setLogs(_logs)
      setLoading(false)
    })()
  }, [query])

  if (loading) return <div>Loading...</div>

  return (
    <div className="flex w-full flex-grow flex-col gap-4">
      {logs.map((log) => (
        <Log key={log.id} log={log} />
      ))}
    </div>
  )
}
