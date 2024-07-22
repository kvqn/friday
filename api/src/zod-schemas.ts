import { z } from "zod"

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])
type Literal = z.infer<typeof literalSchema>
type Json = Literal | { [key: string]: Json } | Json[]

export const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
)

const levelSchema = z.enum(["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"])

export const logInputSchema = z.object({
  namespace: z.string().optional(),
  topic: z.string().optional(),
  level: levelSchema.optional(),
  data: jsonSchema,
})

export const querySchema = z
  .object({
    namespaces: z.array(z.string()).optional(),
    topics: z.array(z.string()).optional(),
    level: levelSchema.optional(),
    before: z
      .string()
      .datetime()
      .optional()
      .transform((val) => (val ? new Date(val) : undefined)),
    after: z
      .string()
      .datetime()
      .optional()
      .transform((val) => (val ? new Date(val) : undefined)),
    limit: z.number().int().positive().optional(),
  })
  .default({})
