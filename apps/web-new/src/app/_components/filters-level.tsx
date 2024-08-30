"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { useFilters } from "./filters"
import type { aggregator } from "@/lib/actions/aggregator"

type Level = Awaited<ReturnType<typeof aggregator.logs>>[number]["level"]

export function LevelFilters() {
  return (
    <div className="flex flex-col gap-4">
      <label className="font-semibold">Log Levels</label>

      <div className="flex flex-wrap justify-center gap-2">
        <LevelCheckbox
          level="DEBUG"
          className="bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        />
        <LevelCheckbox
          level="INFO"
          className="bg-sky-200 hover:bg-sky-300 dark:bg-sky-900 dark:hover:bg-sky-800"
        />
        <LevelCheckbox
          level="WARNING"
          className="bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-900 dark:hover:bg-yellow-800"
        />
        <LevelCheckbox
          level="ERROR"
          className="bg-rose-200 hover:bg-rose-300 dark:bg-rose-900 dark:hover:bg-rose-800"
        />
        <LevelCheckbox
          level="CRITICAL"
          className="bg-violet-200 hover:bg-violet-300 dark:bg-violet-900 dark:hover:bg-violet-800"
        />
      </div>
    </div>
  )
}

function LevelCheckbox({
  level,
  className,
}: {
  level: Level
  className?: string
}) {
  const { query, setQuery } = useFilters()
  return (
    <div
      className={cn(
        "flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1 transition-colors *:cursor-pointer",
        className,
      )}
    >
      <Checkbox
        id={level}
        checked={query.levels?.includes(level)}
        onCheckedChange={() => {
          setQuery((query) => {
            if (query.levels?.includes(level)) {
              return {
                ...query,
                levels: query.levels.filter((l) => l !== level),
              }
            }
            return { ...query, levels: [...(query.levels ?? []), level] }
          })
        }}
      />
      <label htmlFor={level}>{level}</label>
    </div>
  )
}
