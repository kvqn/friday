import { z } from "zod"
import { getTokenScope, insertLog } from "@/lib/queries"

export const LevelSchema = z
  .string()
  .transform((value) => {
    const upper = value.toUpperCase()
    if (upper === "DBUG") return "DEBUG"
    if (upper === "WARN") return "WARNING"
    if (upper === "ERR") return "ERROR"
    if (upper === "ERROR") return "ERROR"
    if (upper === "CRIT") return "CRITICAL"
    return upper
  })
  .pipe(z.enum(["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]))

const RequestSchema = z.object({
  namespace: z.string(),
  message: z.string(),
  level: LevelSchema,
})

export async function getScope(req: Request) {
  const authorization = req.headers.get("authorization")
  if (!authorization?.startsWith("Bearer ")) {
    return null
  }
  const token = authorization.slice(7)

  let scope: Awaited<ReturnType<typeof getTokenScope>>
  try {
    scope = await getTokenScope(token)
  } catch {
    return null
  }

  return scope
}

export async function PUT(req: Request) {
  const scope = await getScope(req)
  if (!scope) {
    return Response.json({ message: "Unauthorized" }, { status: 401 })
  }
  const parsing = RequestSchema.safeParse(await req.json())
  if (!parsing.success) {
    return Response.json({ message: "Bad request" }, { status: 400 })
  }
  const data = parsing.data

  const namespaceId = scope.namespaces.get(data.namespace)
  if (!namespaceId) {
    return Response.json({ message: "Unknown namespace" }, { status: 400 })
  }

  const logId = await insertLog({
    namespaceId,
    message: data.message,
    level: data.level,
  })

  return Response.json({ id: logId }, { status: 201 })
}
