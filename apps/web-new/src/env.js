import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    FRIDAY_ENDPOINT: z.string().url(),
  },
  client: {},
  runtimeEnv: {
    FRIDAY_ENDPOINT: process.env.FRIDAY_ENDPOINT,
  },
  emptyStringAsUndefined: true,
})
