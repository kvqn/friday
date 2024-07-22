import { z } from "zod"
import { publicProcedure, router } from "./trpc"
import { logInputSchema, querySchema } from "./zod-schemas"
import { createLog, queryLog } from "./db/queries"

export const appRouter = router({
  ping: publicProcedure.query(() => {
    return "pong"
  }),
  create: publicProcedure.input(logInputSchema).mutation(async (data) => {
    await createLog(data.input)
  }),
  query: publicProcedure.input(querySchema).query(async (data) => {
    return await queryLog(data.input)
  }),
})

export type AppRouter = typeof appRouter
