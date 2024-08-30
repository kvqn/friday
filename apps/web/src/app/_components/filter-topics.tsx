"use client"

import { useEffect, useState } from "react"
import { aggregator } from "@/lib/actions/aggregator"
import { Skeleton } from "@/components/ui/skeleton"
import { useFilters } from "./filters"
import { MultiSelect } from "@/components/multiselect"

export function TopicsFilter() {
  const [topics, setTopics] = useState<string[]>([])
  const { query, setQuery } = useFilters()

  useEffect(() => {
    void (async () => {
      if (query.namespace)
        setTopics(
          await aggregator.topics({
            namespace: query.namespace,
          }),
        )
    })()
  }, [query.namespace])

  if (!query.namespace) return null

  return (
    <div className="flex w-full flex-col gap-4">
      <label htmlFor="topics" className="font-semibold">
        Topics
      </label>

      {topics.length === 0 ? (
        <Skeleton className="h-12 w-full" />
      ) : (
        <MultiSelect
          title={"Topics"}
          options={topics.map((topic) => ({ name: topic, value: topic }))}
          selected={query.topics ?? []}
          onSelectedChange={(selected) => {
            setQuery((query) => ({
              ...query,
              topics: selected,
            }))
          }}
        />
      )}
    </div>
  )
}
