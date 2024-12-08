import { toast } from "sonner"
import { redirect } from "next/navigation"
import { auth } from "@/server/auth"
import { SignInGithub } from "@/components/auth"

export default async function Page() {
  const session = await auth()

  if (session) {
    redirect("/")
  }

  return (
    <div>
      <h1>Sign In</h1>
      <SignInGithub />
    </div>
  )
}
