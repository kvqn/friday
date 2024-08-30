import { env } from "@/env"
import { createAggregator, createLogger } from "friday-logger"

export const logger = createLogger({
  endpoint: env.FRIDAY_ENDPOINT,
  namespace: "friday-api",
  topic: "default",
})

export const aggregator = createAggregator({
  endpoint: env.FRIDAY_ENDPOINT,
})
