import { createAggregator, createLogger } from "../src"

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomStr(length?: number) {
  if (length === undefined) length = randomInt(1, 100)
  let result = ""
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const endpoint = process.env.FRIDAY_ENDPOINT!

async function _test(
  namespace?: string,
  topic?: string,
  level: "DEBUG" | "INFO" | "WARNING" | "ERROR" | "CRITICAL",
) {
  const logger = createLogger({
    endpoint: endpoint,
    namespace: namespace,
    topic: topic,
  })

  const message = randomStr()

  if (level === "DEBUG") await logger.debug(message)
  if (level === "INFO") await logger.info(message)
  if (level === "WARNING") await logger.warning(message)
  if (level === "ERROR") await logger.error(message)
  if (level === "CRITICAL") await logger.critical(message)

  const aggregator = createAggregator({
    endpoint: endpoint,
  })

  const logs = await aggregator.logs({
    namespace: namespace ?? "default",
    topics: [topic ?? "default"],
    levels: [level],
  })

  if (logs.length === 0) {
    throw new Error("No logs found")
  }

  const log = logs[0]

  expect(log.id).toBeDefined()
  expect(log.timestamp).toBeDefined()
  expect(log.namespace).toBe(namespace ?? "default")
  expect(log.topic).toBe(topic ?? "default")
  expect(log.level).toBe(level)
  expect(log.data).toBe(message)
}

test("debug", async () => { await _test(undefined, undefined, "DEBUG") })
test("info", async () => { await _test(undefined, undefined, "INFO") })
test("warning", async () => { await _test(undefined, undefined, "WARNING") })
test("error", async () => { await _test(undefined, undefined, "ERROR") })
test("critical", async () => { await _test(undefined, undefined, "CRITICAL") })

test("namespace_debug", async () => { await _test(randomStr(), undefined, "DEBUG") })
test("namespace_info", async () => { await _test(randomStr(), undefined, "INFO") })
test("namespace_warning", async () => { await _test(randomStr(), undefined, "WARNING") })
test("namespace_error", async () => { await _test(randomStr(), undefined, "ERROR") })
test("namespace_critical", async () => { await _test(randomStr(), undefined, "CRITICAL") })

test("topic_debug", async () => { await _test(undefined, randomStr(), "DEBUG") })
test("topic_info", async () => { await _test(undefined, randomStr(), "INFO") })
test("topic_warning", async () => { await _test(undefined, randomStr(), "WARNING") })
test("topic_error", async () => { await _test(undefined, randomStr(), "ERROR") })
test("topic_critical", async () => { await _test(undefined, randomStr(), "CRITICAL") })

test("namespace_topic_debug", async () => { await _test(randomStr(), randomStr(), "DEBUG") })
test("namespace_topic_info", async () => { await _test(randomStr(), randomStr(), "INFO") })
test("namespace_topic_warning", async () => { await _test(randomStr(), randomStr(), "WARNING") })
test("namespace_topic_error", async () => { await _test(randomStr(), randomStr(), "ERROR") })
test("namespace_topic_critical", async () => { await _test(randomStr(), randomStr(), "CRITICAL") })






