import { prismaClient, sanityClient } from '@/lib/clients'
import { handleError, zodValidate } from '@/utility'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { CREATE_CATEGORY_VALIDATION_SCHEMA } from './createCategory'

const UPDATE_CATEGORY_BODY_VALIDATION_SCHEMA = CREATE_CATEGORY_VALIDATION_SCHEMA.partial()

const UPDATE_CATEGORY_PARAMS_VALIDATION_SCHEMA = z.object({
  id: z.string().uuid().nonempty(),
})

interface UpdateCategoryPayload {
  body: z.infer<typeof UPDATE_CATEGORY_BODY_VALIDATION_SCHEMA>
  query: z.infer<typeof UPDATE_CATEGORY_PARAMS_VALIDATION_SCHEMA>
}

const updateCategory = async (payload: UpdateCategoryPayload) => {
  try {
    const {
      query: { id },
      body: { description, name },
    } = payload
    const category = await prismaClient.product.findUniqueOrThrow({ where: { id } })
    if (typeof name === 'undefined' || typeof description === 'undefined') return NextResponse.json({ ...category }, { status: 200 })
    const sanityResult = await sanityClient
      .patch(category.sanityId, {
        set: { name, description },
      })
      .commit()
    return NextResponse.json({ ...category, name: sanityResult.name, description: sanityResult.description }, { status: 200 })
  } catch (error) {
    return handleError(error)
  }
}

export default zodValidate({ queryParams: UPDATE_CATEGORY_PARAMS_VALIDATION_SCHEMA, bodyParams: UPDATE_CATEGORY_BODY_VALIDATION_SCHEMA })(
  updateCategory,
)
