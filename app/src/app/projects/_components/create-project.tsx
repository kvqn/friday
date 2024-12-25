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
import { createProject } from "@/server/actions/create-project"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

export function CreateProject() {
  const [disabled, setDisabled] = useState(false)
  const [name, setName] = useState("")
  const [open, setOpen] = useState(false)

  async function submit() {
    setDisabled(true)
    const resp = await createProject({ name })
    if (resp.status === "success") {
      toast.success("Project Created", {
        description: "Your project has been created successfully",
        action: (
          <Button variant={"secondary"}>
            <Link href={`/projects/${resp.projectId}`}>View Project</Link>
          </Button>
        ),
      })
      setOpen(false)
    } else {
      toast.error("Error while creating project", {
        description: resp.message,
      })
    }
    setDisabled(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>New Project</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Project</DialogTitle>
          <DialogDescription>
            Create a new project to start tracking your work.
          </DialogDescription>
        </DialogHeader>
        <label htmlFor="project-name">Project Name</label>
        <Input
          name="project-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button disabled={disabled} onClick={submit}>
          Create Project
        </Button>
      </DialogContent>
    </Dialog>
  )
}
