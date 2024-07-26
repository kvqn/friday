import { z } from "zod"

export const EndpointSchema = z.object({
  address: z.string().url(),
  name: z.string().optional(),
})

export type Endpoint = z.infer<typeof EndpointSchema>

export const EndpointsSchema = z.array(EndpointSchema)

export const IntegerString = z
  .string()
  .refine((a) => !isNaN(parseInt(a)))
  .transform((a) => parseInt(a))
