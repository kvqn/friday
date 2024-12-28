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
import { Badge } from "@/components/ui/badge"
import { editFinegrainedTokenDescription } from "@/server/actions/edit-finegrained-token-description"
import { regenerateFinegrainedToken } from "@/server/actions/regenerate-finegrained-token"
import { deleteFinegrainedToken } from "@/server/actions/delete-finegrained-token"

export function FinegranedTokensTable({
  tokens,
  namespaces,
}: {
  tokens: Awaited<ReturnType<typeof getTokens>>["finegrained_tokens"]
  namespaces: { id: number; name: string }[]
}) {
  return (
    <table className="w-full table-auto rounded-xl border">
      <thead className="border-b">
        <tr className="divide-x text-left *:px-2 *:py-1">
          <th className="w-fit">Token</th>
          <th>Description</th>
          <th>Namespaces</th>
          <th className="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map((token) => (
          <tr key={token.id} className="divide-x *:px-2 *:py-1">
            <td className="font-mono">{token.token}</td>
            <td>{token.description ?? "---"}</td>
            <td className="flex gap-2">
              {token.namespaces.map((namespace) => (
                <Badge key={namespace.id}>{namespace.name}</Badge>
              ))}
            </td>
            <td>
              <div className="flex justify-end gap-2">
                <Edit
                  tokenId={token.id}
                  description={token.description ?? undefined}
                  allNamespaces={namespaces}
                  namespaces={token.namespaces.map((n) => n.id)}
                />
                <Regenerate tokenId={token.id} />
                <Delete tokenId={token.id} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Edit({
  tokenId,
  description,
  allNamespaces,
  namespaces,
}: {
  tokenId: number
  description?: string
  allNamespaces: { id: number; name: string }[]
  namespaces: number[]
}) {
  const [disabled, setDisabled] = useState(false)
  const [open, setOpen] = useState(false)
  const [newDescription, setNewDescription] = useState(description ?? "")
  const [selectedNamespaces, setSelectedNamespaces] = useState(namespaces)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <p className="cursor-pointer text-gray-500 hover:underline">Edit</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Token</DialogTitle>
          <DialogDescription>
            Edit the token description and namespaces
          </DialogDescription>
        </DialogHeader>
        <label htmlFor="description" className="font-semibold">
          Description
        </label>
        <Input
          name="description"
          placeholder={description}
          disabled={disabled}
          value={newDescription}
          onChange={(e) => {
            setNewDescription(e.target.value)
          }}
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
          {allNamespaces.map((namespace) => (
            <Badge
              key={namespace.id}
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
          ))}
        </div>
        <Button
          disabled={disabled}
          onClick={async () => {
            setDisabled(true)
            const resp = await editFinegrainedTokenDescription({
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
              const resp = await regenerateFinegrainedToken(tokenId)
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
              const resp = await deleteFinegrainedToken(tokenId)
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
