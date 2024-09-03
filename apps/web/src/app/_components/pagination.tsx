"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useFilters } from "./filters"
import { useEffect, useState } from "react"
import { aggregator } from "@/lib/actions/aggregator"

function min(a: number, b: number) {
  return a < b ? a : b
}

function max(a: number, b: number) {
  return a > b ? a : b
}

export function LogsPagination() {
  const { query, setQuery } = useFilters()
  const [count, setCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    void (async () => {
      const _count = await aggregator.count(query)
      setCount(_count)
      setTotalPages(Math.ceil(_count / (query.limit ?? 10)))
    })()
  }, [query])

  const [page, setPage] = useState(1)

  useEffect(() => {
    setQuery((prev) => ({ ...prev, offset: (page - 1) * (prev.limit ?? 10) }))
  }, [page, setQuery])

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => {
              setPage(max(page - 1, 1))
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <p className="font-geist-mono">
            Page {page} of {totalPages}
          </p>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => {
              setPage(min(page + 1, totalPages))
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
