import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFilters } from "./filters"

export function PerPage() {
  const { query, setQuery } = useFilters()

  const options = ["10", "20", "50", "100"]

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="per-page" className="text-nowrap">
        Per Page
      </label>
      <Select
        value={query.limit?.toString() ?? "10"}
        onValueChange={(value) => {
          setQuery((prev) => ({
            ...prev,
            limit: parseInt(value),
          }))
        }}
      >
        <SelectTrigger id="per-page">
          <SelectValue placeholder="10" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
