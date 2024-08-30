"use client"

import { useEffect, useState } from "react"
import { aggregator } from "@/lib/actions/aggregator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { useFilters } from "./filters"

export function NamespaceFilter() {
  const [namespaces, setNamespaces] = useState<string[]>([])
  const { query, setQuery } = useFilters()

  useEffect(() => {
    void (async () => {
      setNamespaces(await aggregator.namespaces())
    })()
  }, [])

  return (
    <div className="flex w-full flex-col gap-4">
      <label htmlFor="namespace" className="font-semibold">
        Namespace
      </label>

      {namespaces.length === 0 ? (
        <Skeleton className="h-12 w-full" />
      ) : (
        <Select
          value={query.namespace}
          onValueChange={(value) => {
            setQuery({
              ...query,
              namespace: value,
            })
          }}
        >
          <SelectTrigger className="">
            <SelectValue
              id="namespace"
              placeholder="All Namespaces"
              className="w-full"
            />
          </SelectTrigger>
          <SelectContent>
            {namespaces.map((namespace) => (
              <SelectItem key={namespace} value={namespace}>
                {namespace}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  )
}
