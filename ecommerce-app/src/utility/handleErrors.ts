import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

/**
 * Utility function to handle Zod validation errors.
 *
 * @param {ZodError} error - The Zod validation error object.
 * @returns {NextResponse} - A JSON response containing the validation error details.
 */
export const handleValidationError = (error: unknown): NextResponse => {
  const castedZodError = error as ZodError
  return NextResponse.json(
    {
      message: 'Validation Error',
      errors: castedZodError.flatten().fieldErrors,
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
export const handleError = (error: unknown): NextResponse => {
  const castedError = error as Error
  return NextResponse.json({ message: 'Bad Request', error: castedError.message }, { status: 400 })
}
