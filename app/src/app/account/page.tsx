import { SignOut } from "@/components/auth"
import { auth } from "@/server/auth"
import { redirect } from "next/navigation"

export default async function Page() {
  const session = await auth()

  if (!session) redirect("/signin")
  return (
    <div>
      <h1>Account</h1>
      <SignOut />
    </div>
  )
}
