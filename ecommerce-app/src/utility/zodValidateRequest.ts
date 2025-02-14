import { z } from 'zod'

import zodErrorReadableResponse from './zodErrorReadableResponse'

const zodValidateRequest = (schema: z.AnyZodObject) => {
  return (handler: (req: Request) => Promise<Response>) => {
    return async (req: Request) => {
      if (schema) {
        const validatedBodyParams = Object.keys(schema.shape)
        const params = new URL(req.url).searchParams
        const body = validatedBodyParams.reduce<Record<string, unknown>>((acc, item) => {
          acc[item] = null
          return acc
        }, {})
        if (params.size > 0) {
          //this should probably be seperated in a way, so we can target body or params, but lets merge it for now
          const paramsKeys = Array.from(params.keys())
          for (const key of validatedBodyParams) {
            if (paramsKeys.includes(key)) {
              body[key] = params.get(key)
            }
          }
        }
        if (req.headers.get('content-type') === 'application/x-www-form-urlencoded') {
          const request = await req.formData()
          for (const [key, value] of request.entries()) {
            if (validatedBodyParams.includes(key)) {
              body[key] = value
            }
          }
        }
        if (req.headers.get('content-type') === 'application/json') {
          const request = await req.json()
          for (const key of validatedBodyParams) {
            if (request[key]) {
              body[key] = request[key]
            }
          }
        }
        try {
          schema.parse(body)
          return handler(req)
        } catch (error) {
          if (error instanceof z.ZodError) {
            const errors = zodErrorReadableResponse(error)
            return new Response(JSON.stringify({ message: errors, errors: error.flatten().fieldErrors }), {
              status: 400,
            })
          }
        }
      }
      return handler(req)
    }
  }
}

export default zodValidateRequest
