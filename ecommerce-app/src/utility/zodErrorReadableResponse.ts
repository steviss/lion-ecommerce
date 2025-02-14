import { z } from 'zod'

const zodErrorReadableResponse = (error: z.ZodError) => {
  return `Validation failed. Following fields are missing from body: ${error.errors.map((value) => value.path[0]).join(', ')}`
}

export default zodErrorReadableResponse
