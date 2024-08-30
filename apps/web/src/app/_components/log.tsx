import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import type { getLogs } from "@/lib/actions/getLogs"

export function Log({
  log,
}: {
  log: Awaited<ReturnType<typeof getLogs>>[number]
}) {
  return (
    <div className="flex flex-col divide-y divide-neutral-700 border border-neutral-700">
      <div className="flex items-center divide-x divide-neutral-700 bg-neutral-900 *:px-2 *:py-1">
        <div
          className={cn("font-geist-mono", {
            "bg-red-500": log.level === "ERROR",
            "bg-yellow-500": log.level === "WARNING",
            "bg-blue-500": log.level === "INFO",
            "bg-gray-500": log.level === "DEBUG",
          })}
        >
          {log.level}
        </div>
        <div className="">{log.namespace}</div>
        <div className="">{log.topic}</div>
        <div className="ml-auto">
          {formatDistanceToNow(log.timestamp, { addSuffix: true })}
        </div>
      </div>
      <div className="p-2">{log.data}</div>
    </div>
  )
}
