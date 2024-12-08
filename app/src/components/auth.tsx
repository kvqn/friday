"use client"

import { signIn, signOut } from "next-auth/react"
import { Button } from "./ui/button"

export function SignOut() {
  return (
    <Button variant={"destructive"} onClick={() => signOut()}>
      Sign Out
    </Button>
  )
}

export function SignInGithub() {
  return <Button onClick={() => signIn("github")}>Sign In With GitHub</Button>
}
