import { auth, signIn } from "@/server/auth"
import Link from "next/link"
import { Button } from "./ui/button"
import { Avatar, AvatarImage } from "./ui/avatar"
import Image from "next/image"

async function SessionInfo() {
  const session = await auth()
  if (!session) {
    return (
      <Button>
        <Link href="/signin">Sign In</Link>
      </Button>
    )
  }
  return (
    <div className="flex items-center gap-4">
      <Button>
        <Link href="/projects">Projects</Link>
      </Button>

      <Link
        href="/account"
        className="flex max-h-8 items-center gap-2 rounded-md border px-2 py-1 hover:bg-neutral-100"
      >
        <Image
          src={session.user.image ?? ""}
          className="rounded-full"
          alt={"user image"}
          width={20}
          height={20}
        />
        <div>{session.user.name}</div>
      </Link>
    </div>
  )
}

export async function Navbar() {
  return (
    <nav className="flex justify-between p-2">
      <div className="flex gap-4">
        <Link href="/">Friday</Link>
        <Link href="/docs">Docs</Link>
      </div>
      <div>
        <SessionInfo />
      </div>
    </nav>
  )
}
