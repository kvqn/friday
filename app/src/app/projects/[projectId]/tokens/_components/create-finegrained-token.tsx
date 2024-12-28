"use client"
import { Badge } from "@/components/ui/badge"
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
import { cn } from "@/lib/utils"
import { createFinegrainedToken } from "@/server/actions/create-finegrained-token"
import { useState } from "react"
import { toast } from "sonner"

export function CreateFinegrainedToken({
  projectId,
  namespaces,
}: {
  projectId: number
  namespaces: { id: number; name: string }[]
}) {
  const [disabled, setDisabled] = useState(false)
  const [description, setDescription] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedNamespaces, setSelectedNamespaces] = useState<number[]>([])

  async function submit() {
    setDisabled(true)
    const resp = await createFinegrainedToken({
      projectId,
      description,
      namespaces: selectedNamespaces,
    })
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
        <Button>Add Fine-Grained Token</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Fine-Grained Token</DialogTitle>
          <DialogDescription>
            Fine-Grained Tokens can be used within specific namespaces within
            the project.
          </DialogDescription>
        </DialogHeader>
        <label htmlFor="description" className="font-semibold">
          Description
        </label>
        <Input
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex flex-col gap-0">
          <label htmlFor="namespaces" className="font-semibold">
            Namespaces
          </label>
          <p className="text-sm text-gray-500">
            You have selected {selectedNamespaces.length} namespaces.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {namespaces.map((namespace) => (
            <div key={namespace.id} className="flex items-center gap-2">
              <Badge
                variant={
                  selectedNamespaces.includes(namespace.id)
                    ? "default"
                    : "secondary"
                }
                className="cursor-pointer select-none"
                onClick={() => {
                  setSelectedNamespaces((prev) => {
                    if (prev.includes(namespace.id)) {
                      return prev.filter((id) => id !== namespace.id)
                    }
                    return prev.concat(namespace.id)
                  })
                }}
              >
                {namespace.name}
              </Badge>
            </div>
          ))}
        </div>

        <Button disabled={disabled} onClick={submit}>
          Create
        </Button>
      </DialogContent>
    </Dialog>
  )
}
