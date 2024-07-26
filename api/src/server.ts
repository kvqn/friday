import { createHTTPServer } from "@trpc/server/adapters/standalone"
import { appRouter } from "./router"
import cors from "cors"

const server = createHTTPServer({
  router: appRouter,
  middleware: cors({
    origin: "*",
  }),
})

console.log("Listening on port 3000")
server.listen(3000)
