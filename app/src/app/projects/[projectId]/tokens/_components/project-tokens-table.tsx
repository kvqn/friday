"use client"

import type { getTokens } from "@/lib/queries"

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
import { toast } from "sonner"
import { editProjectTokenDescription } from "@/server/actions/edit-project-token-description"
import { regenerateProjectToken } from "@/server/actions/regenerate-project-token"
import { deleteProjectToken } from "@/server/actions/delete-project-token"

export function ProjectTokensTable({
  tokens,
}: {
  tokens: Awaited<ReturnType<typeof getTokens>>["project_tokens"]
}) {
  return (
    <div className="w-full rounded-lg border">
      <div className="flex items-center gap-2 border-b px-4 py-1 font-semibold">
        <div className="w-60">Token</div>
        <div>Description</div>
      </div>
      {tokens.map((token) => (
        <div key={token.id} className="flex gap-2 px-4 py-1">
          <div className="w-60 font-mono">{token.token}</div>
          <div className="flex-grow text-gray-600">{token.description}</div>
          <EditDescription
            tokenId={token.id}
            description={token.description ?? undefined}
          />
          <Regenerate tokenId={token.id} />
          <Delete tokenId={token.id} />
        </div>
      ))}
    </div>
  )
}

function EditDescription({
  tokenId,
  description,
}: {
  tokenId: number
  description?: string
}) {
  const [disabled, setDisabled] = useState(false)
  const [open, setOpen] = useState(false)
  const [newDescription, setNewDescription] = useState(description ?? "")
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <p className="cursor-pointer text-gray-500 hover:underline">Edit</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Token Description</DialogTitle>
          <DialogDescription>Edit the token description</DialogDescription>
        </DialogHeader>
        <Input
          placeholder={description}
          disabled={disabled}
          value={newDescription}
          onChange={(e) => {
            setNewDescription(e.target.value)
          }}
        />
        <Button
          disabled={disabled}
          onClick={async () => {
            setDisabled(true)
            const resp = await editProjectTokenDescription({
              tokenId,
              description: newDescription,
            })
            if (resp.status === "success") {
              toast.success(resp.message)
              setOpen(false)
            } else {
              toast.error(resp.message)
            }
            setDisabled(false)
          }}
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  )
}

function Regenerate({ tokenId }: { tokenId: number }) {
  const [disabled, setDisabled] = useState(false)
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <p className="cursor-pointer text-emerald-600 hover:underline">
          Regenerate
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Regenerate Token</DialogTitle>
          <DialogDescription>
            Are you sure you want to regenerate the token?
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 *:w-full">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={disabled}
            className="bg-emerald-500 hover:bg-emerald-600"
            onClick={async () => {
              setDisabled(true)
              const resp = await regenerateProjectToken(tokenId)
              if (resp.status === "success") {
                toast.success(resp.message)
                setOpen(false)
              } else {
                toast.error(resp.message)
              }
              setDisabled(false)
            }}
          >
            Regenerate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Delete({ tokenId }: { tokenId: number }) {
  const [disabled, setDisabled] = useState(false)
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <p className="cursor-pointer text-red-600 hover:underline">Delete</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Token</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the token?
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 *:w-full">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={disabled}
            variant="destructive"
            onClick={async () => {
              setDisabled(true)
              const resp = await deleteProjectToken(tokenId)
              if (resp.status === "success") {
                toast.success(resp.message)
                setOpen(false)
              } else {
                toast.error(resp.message)
              }
              setDisabled(false)
            }}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
