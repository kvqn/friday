import { getLogsCount } from "@/lib/queries"
import moment from "moment"
import { getScope } from "@/app/api/logs/route"

export async function GET(
  req: Request,
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

  const from = moment().subtract(1, "hour").toDate()
  const count = await getLogsCount({ namespaceId, from })

  return Response.json({ count })
}
