import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { zodReadableErrorBodyResponse } from './zodReadableErrors'

const zodValidateBody = (schema: z.AnyZodObject) => {
  return (handler: (req: NextRequest) => Promise<NextResponse>) => {
    return async (req: NextRequest) => {
      if (schema) {
        const validatedBodyParams = Object.keys(schema.shape)
        const body = validatedBodyParams.reduce<Record<string, unknown>>((acc, item) => {
          acc[item] = null
          return acc
        }, {})
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
            const errors = zodReadableErrorBodyResponse(error)
            return NextResponse.json(
              {
                message: errors,
                errors: error.flatten().fieldErrors,
              },
              { status: 400 },
            )
          }
        }
      }
      return handler(req)
    }
  }
}

export default zodValidateBody
