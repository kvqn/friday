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
  const { page, setPage, query } = useFilters()
  const [count, setCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    void (async () => {
      const _count = await aggregator.count(query)
      setCount(_count)
      setTotalPages(Math.ceil(_count / (query.limit ?? 10)))
    })()
  }, [query])

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
        {page > 2 ? (
          <>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            {page > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        ) : null}
        {Array.from({ length: min(1, page - 1) }).map((_, i) => (
          <PaginationItem key={page - min(1, page - 1) + i}>
            <PaginationLink href="#">
              {page - min(1, page - 1) + i}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink href="#" className="border">
            {page}
          </PaginationLink>
        </PaginationItem>
        {Array.from({ length: min(1, totalPages - page) }).map((_, i) => (
          <PaginationItem key={page + i + 1}>
            <PaginationLink href="#">{page + i + 1}</PaginationLink>
          </PaginationItem>
        ))}
        {totalPages - page > 2 ? (
          <>
            {totalPages - page > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink href="#">{totalPages}</PaginationLink>
            </PaginationItem>
          </>
        ) : null}
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
