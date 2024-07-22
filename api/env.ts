import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
  server: {
    MYSQL_HOST: z.string(),
    MYSQL_USER: z.string(),
    MYSQL_PASS: z.string(),
    MYSQL_DB: z.string(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
