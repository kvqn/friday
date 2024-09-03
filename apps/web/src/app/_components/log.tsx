import type { aggregator } from "@/lib/actions/aggregator"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"

export function Log({
  log,
}: {
  log: Awaited<ReturnType<typeof aggregator.logs>>[number]
}) {
  return (
    <div
      className={cn(
        "flex flex-col divide-y rounded-md border",
        "divide-neutral-300 border-neutral-300 dark:divide-neutral-700 dark:border-neutral-700",
      )}
    >
      <div
        className={cn(
          "flex items-center divide-x *:px-2 *:py-1",
          "divide-neutral-300 bg-neutral-100 dark:divide-neutral-700 dark:bg-neutral-900",
        )}
      >
        <div
          className={cn("rounded-tl-md font-geist-mono", {
            "bg-red-500": log.level === "ERROR",
            "bg-yellow-500": log.level === "WARNING",
            "bg-blue-500": log.level === "INFO",
            "bg-gray-500": log.level === "DEBUG",
          })}
        >
          {log.level}
        </div>
        <div>{log.namespace}</div>
        <div>{log.topic}</div>
        <div className="h-8 flex-grow"></div>
        <div className="font-geist-mono text-neutral-400 dark:text-neutral-600">
          #{log.id}
        </div>
        <div>{formatDistanceToNow(log.timestamp, { addSuffix: true })}</div>
      </div>
      <div className="p-2">{log.data}</div>
    </div>
  )
}
