import { Navbar } from "@/components/navbar"
import "@/styles/globals.css"
import { Toaster } from "@/components/ui/sonner"

import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { type Metadata } from "next"
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
  title: "Friday",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  )
}
