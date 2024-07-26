import { z } from "zod"
import { publicProcedure, router } from "./trpc"
import {
  createLogSchema,
  getLogsSchema,
  getNamespacesSchema,
  getTopicsSchema,
} from "./zod-schemas"
import { createLog, getLogs, getNamespaces, getTopics } from "./db/queries"

export const appRouter = router({
  ping: publicProcedure.query(() => {
    return "pong"
  }),
  createLog: publicProcedure.input(createLogSchema).mutation(async (data) => {
    await createLog(data.input)
  }),
  getLogs: publicProcedure.input(getLogsSchema).query(async (data) => {
    return await getLogs(data.input)
  }),
  getNamespaces: publicProcedure
    .input(getNamespacesSchema)
    .query(async (data) => {
      return await getNamespaces(data.input)
    }),
  getTopics: publicProcedure.input(getTopicsSchema).query(async (data) => {
    return await getTopics(data.input)
  }),
})

export type AppRouter = typeof appRouter
