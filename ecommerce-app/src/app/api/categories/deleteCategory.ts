import { handleError, zodValidate } from '@/utility'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const DELETE_CATEGORY_VALIDATION_SCHEMA = z.object({
  id: z.string().uuid().nonempty(),
})

interface DeleteCategoryPayload {
  query: z.infer<typeof DELETE_CATEGORY_VALIDATION_SCHEMA>
}

const deleteCategory = async (payload: DeleteCategoryPayload) => {
  try {
    return NextResponse.json({ message: 'Welcome to the DELETE Category route!', payload }, { status: 200 })
  } catch (error) {
    return handleError(error)
  }
}

export default zodValidate({ queryParams: DELETE_CATEGORY_VALIDATION_SCHEMA })(deleteCategory)
