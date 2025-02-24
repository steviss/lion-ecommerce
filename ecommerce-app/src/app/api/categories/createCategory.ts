import { handleError, zodValidate } from '@/utility'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export const CREATE_CATEGORY_VALIDATION_SCHEMA = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
})

interface CreateCategoryPayload {
  body: z.infer<typeof CREATE_CATEGORY_VALIDATION_SCHEMA>
}

const createCategory = async (payload: CreateCategoryPayload) => {
  try {
    return NextResponse.json({ message: 'Welcome to the POST Category route!', payload }, { status: 200 })
  } catch (error) {
    return handleError(error)
  }
}

export default zodValidate({ bodyParams: CREATE_CATEGORY_VALIDATION_SCHEMA })(createCategory)
