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
    limit: 10,
  })

  return (
    <FiltersContext.Provider value={{ query, setQuery }}>
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
