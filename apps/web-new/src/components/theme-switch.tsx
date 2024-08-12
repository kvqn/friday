"use client"

import { useTheme } from "@/client/hooks/theme"
import { Switch } from "./ui/switch"

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={theme == "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      Dark Mode
    </div>
  )
}
