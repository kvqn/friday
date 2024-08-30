import type { aggregator } from "@/lib/friday"

export type QueryType = Parameters<typeof aggregator.logs>[0]

export type CountQueryType = Parameters<typeof aggregator.count>[0]
