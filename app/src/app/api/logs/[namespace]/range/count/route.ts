import { getLogsCount } from "@/lib/queries"
import { getScope } from "@/app/api/logs/route"
import { z } from "zod"
import type { NextRequest } from "next/server"

const DateSchema = z
  .string()
  .transform((v) => new Date(v))
  .pipe(z.date())

const UndefinedSchema = z.optional(z.null().transform(() => undefined))

const RequestSchema = z.object({
  from: DateSchema,
  to: z.union([DateSchema, UndefinedSchema]),
})

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ namespace: string }> },
) {
  const scope = await getScope(req)
  if (!scope) {
    return Response.json({ message: "Unauthorized" }, { status: 401 })
  }

  const namespace = (await params).namespace
  const namespaceId = scope.namespaces.get(namespace)
  if (!namespaceId) {
    return Response.json({ message: "Unknown namespace" }, { status: 400 })
  }

  const searchParams = req.nextUrl.searchParams
  console.log(searchParams)
  const parsing = RequestSchema.safeParse({
    from: searchParams.get("from"),
    to: searchParams.get("to"),
  })
  if (!parsing.success) {
    return Response.json({ message: "Bad request" }, { status: 400 })
  }
  const data = parsing.data

  const count = await getLogsCount({
    namespaceId,
    from: data.from,
    to: data.to,
  })

  return Response.json({ count })
}
