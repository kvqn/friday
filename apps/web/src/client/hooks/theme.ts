"use client"
import { useTheme as _useTheme } from "next-themes"

export function useTheme() {
  const { theme, setTheme } = _useTheme()
  return {
    theme: theme == "light" ? "light" : "dark",
    setTheme,
  }
}
