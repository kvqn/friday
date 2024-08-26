type LogData = string | NonNullable<unknown>

type Logger = {
  debug(data: LogData): Promise<void>
  info(data: LogData): Promise<void>
  warning(data: LogData): Promise<void>
  error(data: LogData): Promise<void>
  critical(data: LogData): Promise<void>
}

type LoggerOptions = {
  endpoint: string
  namespace: string
  topic: string
}

type Level = "DEBUG" | "INFO" | "WARNING" | "ERROR" | "CRITICAL"

type PutLog = {
  namespace: string
  topic: string
  level: Level
  data: string
}

export function createLogger(options: LoggerOptions): Logger {
  const log = async ({ data, level }: { data: LogData; level: Level }) => {
    let data_string = ""
    if (data instanceof Object) data = JSON.stringify(data)
    else data_string = data as string

    const body: PutLog = {
      namespace: options.namespace,
      topic: options.topic,
      level: level,
      data: data_string,
    }

    console.log()

    await fetch(options.endpoint + "/logs", {
      method: "PUT",
      body: JSON.stringify(body),
    })
    console.log("log sent")
  }

  return {
    debug: (data: LogData) => log({ data, level: "DEBUG" }),
    info: (data: LogData) => log({ data, level: "INFO" }),
    warning: (data: LogData) => log({ data, level: "WARNING" }),
    error: (data: LogData) => log({ data, level: "ERROR" }),
    critical: (data: LogData) => log({ data, level: "CRITICAL" }),
  }
}

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
