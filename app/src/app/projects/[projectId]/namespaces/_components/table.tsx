"use client"
import { Checkbox } from "@/components/ui/checkbox"
import type { getNamespaces } from "@/lib/queries"
import { MdOutlineDriveFileRenameOutline } from "react-icons/md"
import { FaRegTrashAlt } from "react-icons/fa"
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
import { Button } from "@/components/ui/button"
import { renameNamespace } from "@/server/actions/rename-namespace"
import { toast } from "sonner"
import { deleteNamespace } from "@/server/actions/delete-namespace"

export function NamespacesTable({
  namespaces,
}: {
  namespaces: Awaited<ReturnType<typeof getNamespaces>>
}) {
  return (
    <div className="w-full rounded-lg border">
      <div className="flex items-center gap-2 border-b px-2 py-1">
        <div className="flex-grow">{`There are ${namespaces.length} namespaces in this project.`}</div>
        <div></div>
      </div>
      {namespaces.map((namespace) => (
        <div key={namespace.id} className="flex items-center gap-4 px-2 py-1">
          <div className="flex-grow font-mono"># {namespace.name}</div>
          <RenameNamespace namespaceId={namespace.id} name={namespace.name} />
          <DeleteNamespace namespaceId={namespace.id} name={namespace.name} />
        </div>
      ))}
    </div>
  )
}

function RenameNamespace({
  namespaceId,
  name,
}: {
  namespaceId: number
  name: string
}) {
  const [newName, setNewName] = useState(name)
  const [disabled, setDisabled] = useState(false)
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <p className="cursor-pointer text-gray-600 hover:underline">Rename</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename namespace</DialogTitle>
          <DialogDescription>
            You will need to update your code to reflect the new namespace name.
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder={name}
          disabled={disabled}
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value)
          }}
        />
        <Button
          disabled={disabled}
          onClick={async () => {
            setDisabled(true)
            const resp = await renameNamespace(namespaceId, newName)
            if (resp.status === "success") {
              toast.success(resp.message)
              setOpen(false)
            } else {
              toast.error(resp.message)
              setDisabled(false)
            }
          }}
        >
          Rename
        </Button>
      </DialogContent>
    </Dialog>
  )
}

function DeleteNamespace({
  namespaceId,
  name,
}: {
  namespaceId: number
  name: string
}) {
  const [disabled, setDisabled] = useState(false)
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <p className="cursor-pointer text-red-600 hover:underline">Delete</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {name}</DialogTitle>
          <DialogDescription>
            This action is not reversible. Are you sure you want to delete this
            namespace?
          </DialogDescription>
        </DialogHeader>
        <Button
          variant="destructive"
          disabled={disabled}
          onClick={async () => {
            setDisabled(true)
            const resp = await deleteNamespace(namespaceId)
            if (resp.status === "success") {
              toast.success(resp.message)
              setOpen(false)
            } else {
              toast.error(resp.message)
              setDisabled(false)
            }
          }}
        >
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  )
}
