"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Tab({ href, title }: { href: string; title: string }) {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      className={cn(
        "rounded-md px-2 py-1 transition-colors hover:bg-gray-200",
        {
          "bg-gray-300": pathname === href,
        },
      )}
    >
      {title}
    </Link>
  )
}
