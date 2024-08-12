import { createTRPCClient, httpBatchLink } from "@trpc/client"
import type { AppRouter } from "../../../../api/src/router"
import { env } from "@/env"

export const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: env.FRIDAY_ENDPOINT,
    }),
  ],
})
