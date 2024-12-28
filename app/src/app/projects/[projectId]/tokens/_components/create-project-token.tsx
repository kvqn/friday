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
import { createProjectToken } from "@/server/actions/create-project-token"
import { useState } from "react"
import { toast } from "sonner"

export function CreateProjectToken({ projectId }: { projectId: number }) {
  const [disabled, setDisabled] = useState(false)
  const [description, setDescription] = useState("")
  const [open, setOpen] = useState(false)

  async function submit() {
    setDisabled(true)
    const resp = await createProjectToken({ projectId, description })
    if (resp.status === "success") {
      toast.success(resp.message)
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
      <DialogTrigger asChild>
        <Button>Add Project Token</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Project Token</DialogTitle>
          <DialogDescription>
            Project Tokens can be used throughout all the namespaces within the
            project.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <p className="text-sm text-gray-400">(optional)</p>
        </div>
        <Input
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button disabled={disabled} onClick={submit}>
          Create
        </Button>
      </DialogContent>
    </Dialog>
  )
}
