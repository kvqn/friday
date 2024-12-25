"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"

export function CreateProjectToken({ projectId }: { projectId: number }) {
  const [disabled, setDisabled] = useState(false)
  const [name, setName] = useState("")
  const [open, setOpen] = useState(false)

  async function submit() {
    setDisabled(true)
    const resp = await createNamespace({ projectId, name })
    if (resp.status === "success") {
      toast.success("Token Created", {
        description: "Project token has been created successfully",
      })
      setOpen(false)
    } else {
      toast.error("Error while creating token", {
        description: resp.message,
      })
    }
    setDisabled(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Add a token</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a token</DialogTitle>
          <DialogDescription>Create a new token.</DialogDescription>
        </DialogHeader>
        <label htmlFor="project-name">Namespace</label>
        <Input
          name="namespace"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button disabled={disabled} onClick={submit}>
          Create
        </Button>
      </DialogContent>
    </Dialog>
  )
}
