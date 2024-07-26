import { createTRPCClient, httpBatchLink } from "@trpc/client"
import type { AppRouter } from "../../../../api/src/router"
import { inferRouterOutputs } from "@trpc/server"
//     👆 **type-only** import
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
})

export type RouterOutputs = inferRouterOutputs<AppRouter>
