type AggregatorOptions = {
  endpoint: string
}

type GetLogOptions = {
  limit?: number
  offset?: number
  namespaces?: string[]
  topics?: string[]
  namespaces_and_topics?: { namespace: string; topic: string }[]
  levels?: string[]
  before?: Date
  after?: Date
}

type Log = {
  id: number
  namespace: string
  topic: string
  level: "DEBUG" | "INFO" | "WARNING" | "ERROR" | "CRITICAL"
  data: string
}

function stringifyValues(obj: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, JSON.stringify(value)]),
  )
}

export function createAggregator(options: AggregatorOptions) {
  return {
    query: async (query: GetLogOptions) => {
      const params = new URLSearchParams(stringifyValues(query)).toString()
      const resp = await fetch(options.endpoint + "/logs?" + params, {
        method: "GET",
      })

      const json = (await resp.json()) as { logs: Log[] }
      return json.logs
    },
  }
}
