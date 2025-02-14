import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { zodReadableErrorQueryResponse } from './zodReadableErrors'

export const zodValidateQuery = (schema: z.AnyZodObject) => {
  return (handler: (req: NextRequest) => Promise<NextResponse>) => {
    return async (req: NextRequest) => {
      if (schema) {
        const validatedBodyParams = Object.keys(schema.shape)
        const params = new URL(req.url).searchParams
        const body = validatedBodyParams.reduce<Record<string, unknown>>((acc, item) => {
          acc[item] = null
          return acc
        }, {})
        if (params.size > 0) {
          const paramsKeys = Array.from(params.keys())
          for (const key of validatedBodyParams) {
            if (paramsKeys.includes(key)) {
              body[key] = params.get(key)
            }
          }
        }
        try {
          schema.parse(body)
          return handler(req)
        } catch (error) {
          if (error instanceof z.ZodError) {
            const errors = zodReadableErrorQueryResponse(error)
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
