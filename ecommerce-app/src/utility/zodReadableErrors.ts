import { z } from 'zod'

export const zodReadableErrorBodyResponse = (error: z.ZodError) => {
  return `Validation failed. Following fields are missing from body: ${error.errors.map((value) => value.path[0]).join(', ')}`
}

export const zodReadableErrorQueryResponse = (error: z.ZodError) => {
  return `Validation failed. Following fields are missing from query: ${error.errors.map((value) => value.path[0]).join(', ')}`
}
