type AggregatorOptions = {
  endpoint: string
}

type GetLogOptions = {
  limit?: number
  offset?: number
  namespace?: string
  topics?: string[]
  levels?: string[]
  before?: Date
  after?: Date
  order?: "ASC" | "DESC"
}

type CountLogOptions = {
  namespace?: string
  topics?: string[]
  levels?: string[]
  before?: Date
  after?: Date
}

type Log = {
  id: number
  timestamp: Date
  namespace: string
  topic: string
  level: "DEBUG" | "INFO" | "WARNING" | "ERROR" | "CRITICAL"
  data: string
}

export function createAggregator(options: AggregatorOptions) {
  return {
    logs: async (query: GetLogOptions) => {
      const resp = await fetch(options.endpoint + "/logs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      })

      const json = (await resp.json()) as { logs: Log[] }
      return json.logs.map((log) => ({
        ...log,
        timestamp: new Date(log.timestamp),
      }))
    },

    count: async (query: CountLogOptions) => {
      const resp = await fetch(options.endpoint + "/logs/count/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      })

      const json = (await resp.json()) as { count: number }
      return json.count
    },

    namespaces: async () => {
      const resp = await fetch(options.endpoint + "/namespaces/")
      const json = (await resp.json()) as { namespaces: string[] }
      return json.namespaces
    },

    topics: async ({ namespace }: { namespace: string }) => {
      const resp = await fetch(
        options.endpoint + "/topics/" + `?namespace=${namespace}`,
      )
      const json = (await resp.json()) as { topics: string[] }
      return json.topics
    },
  }
}
