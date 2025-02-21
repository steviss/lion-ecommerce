import { NextRequest, NextResponse } from 'next/server'
import { ZodError, z } from 'zod'

/**
 * Utility function to parse the request body based on the content type.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<Record<string, unknown>>} - A promise that resolves to the parsed request body.
 */
const parseRequestBody = async (req: NextRequest): Promise<Record<string, unknown>> => {
  if (req.method === 'GET') return {}

  const contentType = req.headers.get('content-type')
  if (contentType === 'application/x-www-form-urlencoded') {
    return Object.fromEntries(await req.formData())
  } else if (contentType === 'application/json') {
    return req.json()
  }

  return {}
}

/**
 * Utility function to parse query parameters from the request URL.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {Record<string, unknown>} - An object containing the parsed query parameters.
 */
const parseQueryParams = async (req: NextRequest): Promise<Record<string, unknown>> => {
  const searchParams = new URL(req.url).searchParams
  const queryData: Record<string, unknown> = {}
  for (const key of searchParams.keys()) {
    queryData[key] = searchParams.get(key)
  }
  return queryData
}

/**
 * Utility function to handle Zod validation errors.
 *
 * @param {ZodError} error - The Zod validation error object.
 * @returns {NextResponse} - A JSON response containing the validation error details.
 */
const handleValidationError = (error: ZodError): NextResponse => {
  return NextResponse.json(
    {
      message: 'Validation Error',
      errors: error.flatten().fieldErrors,
    },
    { status: 400 },
  )
}

/**
 * Utility function to handle generic errors.
 *
 * @param {Error} error - The error object.
 * @returns {NextResponse} - A JSON response containing the error message.
 */
const handleError = (error: Error): NextResponse => {
  return NextResponse.json({ message: 'Bad Request', error: error.message }, { status: 400 })
}

/**
 * Options object for zodValidate function.
 *
 * @template TBody - The Zod schema for the request body.
 * @template TQuery - The Zod schema for the query parameters.
 */
interface ZodValidateOptions<TBody extends z.AnyZodObject, TQuery extends z.AnyZodObject> {
  /** Zod schema for validating the request body. */
  bodyParams?: TBody
  /** Zod schema for validating the query parameters. */
  queryParams?: TQuery
}

/**
 * Middleware function to validate request body and query parameters using Zod schemas.
 *
 * @template TBody - The Zod schema for the request body.
 * @template TQuery - The Zod schema for the query parameters.
 * @param {ZodValidateOptions<TBody, TQuery>} options - The options object containing Zod schemas for validation.
 * @returns {Function} - A middleware function that validates the request and passes validated data to the handler.
 */
export const zodValidate = <TBody extends z.AnyZodObject, TQuery extends z.AnyZodObject>({
  bodyParams,
  queryParams,
}: ZodValidateOptions<TBody, TQuery>): ((
  handler: (payload: { body: z.infer<TBody>; query: z.infer<TQuery> }) => Promise<NextResponse>,
) => (req: NextRequest) => Promise<NextResponse>) => {
  return (handler: (payload: { body: z.infer<TBody>; query: z.infer<TQuery> }) => Promise<NextResponse>) => {
    return async (req: NextRequest) => {
      try {
        // Parse body and query params
        const bodyData = bodyParams ? await parseRequestBody(req) : {}
        const queryData = queryParams ? await parseQueryParams(req) : {}

        // Validate body and query params
        const validatedBody = bodyParams ? bodyParams.parse(bodyData) : {}
        const validatedQuery = queryParams ? queryParams.parse(queryData) : {}

        // Pass validated data to the handler
        return handler({ body: validatedBody, query: validatedQuery })
      } catch (error) {
        if (error instanceof ZodError) {
          return handleValidationError(error)
        }
        return handleError(error as Error)
      }
    }
  }
}
