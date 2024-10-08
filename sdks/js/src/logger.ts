import type { Level, LogData } from "./common"

type LoggerOptions = {
  endpoint: string
  namespace: string
  topic: string
}

type PutLog = {
  namespace: string
  topic: string
  level: Level
  data: string
}


type Logger = {
  debug(data: LogData): Promise<void>
  info(data: LogData): Promise<void>
  warning(data: LogData): Promise<void>
  error(data: LogData): Promise<void>
  critical(data: LogData): Promise<void>
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
      headers: {'Content-Type': 'application/json'},
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