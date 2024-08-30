import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button"
import { ChevronsUpDown, CircleCheck } from "lucide-react"

export function MultiSelect({
  title,
  options,
  selected,
  onSelectedChange,
}: {
  title?: string
  options: { name: string; value: string }[]
  selected: string[]
  onSelectedChange: (selected: string[]) => void
}) {
  function toggleSelected(value: string) {
    if (selected.includes(value)) {
      onSelectedChange(selected.filter((v) => v !== value))
    } else {
      onSelectedChange([...selected, value])
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center justify-between">
          {title} {selected.length > 0 ? `(${selected.length})` : `(All)`}
          <ChevronsUpDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {options.map((option) => (
          <div
            key={option.value}
            className="flex cursor-pointer items-center justify-between rounded-md px-4 py-2 transition-colors hover:bg-muted"
            onClick={() => toggleSelected(option.value)}
          >
            {selected.includes(option.value) ? (
              <CircleCheck className="h-4 w-4" />
            ) : null}
            <p className="ml-auto">{option.name}</p>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
