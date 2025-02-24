import { handleError, zodValidate } from '@/utility'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { CREATE_CATEGORY_VALIDATION_SCHEMA } from './createCategory'

const UPDATE_CATEGORY_BODY_VALIDATION_SCHEMA = CREATE_CATEGORY_VALIDATION_SCHEMA

const UPDATE_CATEGORY_PARAMS_VALIDATION_SCHEMA = z.object({
  id: z.string().uuid().nonempty(),
})

interface UpdateCategoryPayload {
  body: z.infer<typeof UPDATE_CATEGORY_BODY_VALIDATION_SCHEMA>
  query: z.infer<typeof UPDATE_CATEGORY_PARAMS_VALIDATION_SCHEMA>
}

const updateCategory = async (payload: UpdateCategoryPayload) => {
  try {
    return NextResponse.json({ message: 'Welcome to the DELETE Category route!', payload }, { status: 200 })
  } catch (error) {
    return handleError(error)
  }
}

export default zodValidate({ queryParams: UPDATE_CATEGORY_PARAMS_VALIDATION_SCHEMA, bodyParams: UPDATE_CATEGORY_BODY_VALIDATION_SCHEMA })(
  updateCategory,
)
