"use server"

import { client } from "../trpc"

export async function getLogs() {
  console.log("server side")
  return await client.getLogs.query({
    limit: 50,
    namespacesAndTopics: [{ namespace: "heartbeat", topic: "laptop" }],
    level: "INFO",
  })
}
