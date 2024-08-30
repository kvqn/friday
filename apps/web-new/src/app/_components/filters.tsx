"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ContextType,
  type Dispatch,
  type SetStateAction,
} from "react"
import type { QueryType } from "@/types"
import { ThemeSwitch } from "@/components/theme-switch"
import { LevelFilters } from "./filters-level"
import { PerPage } from "./filters-per-page"
import { NamespaceFilter } from "./filter-namespace"
import { TopicsFilter } from "./filter-topics"

const FiltersContext = createContext<{
  query: QueryType
  setQuery: Dispatch<SetStateAction<QueryType>>
  page: number
  setPage: Dispatch<SetStateAction<number>>
} | null>(null)

export function useFilters() {
  const context = useContext(FiltersContext)
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState<QueryType>({
    limit: 50,
  })

  const [page, setPage] = useState(1)

  return (
    <FiltersContext.Provider value={{ query, setQuery, page, setPage }}>
      {children}
    </FiltersContext.Provider>
  )
}

export function Filters() {
  return (
    <div className="mx-auto flex h-full max-w-[400px] flex-col items-center gap-8 p-4">
      <h1 className="text-center text-xl font-bold">Filters & Settings</h1>
      <NamespaceFilter />
      <TopicsFilter />
      <LevelFilters />
      <PerPage />
      <ThemeSwitch className="mt-auto" />
    </div>
  )
}
