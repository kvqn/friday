"use client"

import { useTheme } from "next-themes"
import { Switch } from "./ui/switch"
import { cn } from "@/lib/utils"

export function ThemeSwitch({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      Dark Mode
    </div>
  )
}
