import { clsx, type ClassValue } from "clsx"
import { randomBytes } from "crypto"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomToken() {
  return randomBytes(12).toString("hex")
}
