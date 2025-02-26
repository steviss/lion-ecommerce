import { CREATE_BRAND_VALIDATION_SCHEMA } from '@/app/api/brands/createBrands'
import { prismaClient, sanityClient } from '@/lib/clients'
import { handleError, zodValidate } from '@/utility'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const UPDATE_BRAND_BODY_VALIDATION_SCHEMA = CREATE_BRAND_VALIDATION_SCHEMA.partial()

const UPDATE_BRAND_PARAMS_VALIDATION_SCHEMA = z.object({
  id: z.string({ message: 'Please enter an id' }).uuid({ message: 'Please enter a valid id' }),
})

interface UpdateCategoryPayload {
  body: z.infer<typeof UPDATE_BRAND_BODY_VALIDATION_SCHEMA>
  query: z.infer<typeof UPDATE_BRAND_PARAMS_VALIDATION_SCHEMA>
}

const updateCategory = async (payload: UpdateCategoryPayload) => {
  try {
    const {
      query: { id },
      body: { description, name },
    } = payload
    const brand = await prismaClient.brand.findUniqueOrThrow({ where: { id } })
    if (typeof name === 'undefined' || typeof description === 'undefined') return NextResponse.json({ ...brand }, { status: 200 })
    const sanityResult = await sanityClient
      .patch(brand.sanityId, {
        set: { name, description },
      })
      .commit()
    return NextResponse.json({ ...brand, name: sanityResult.name, description: sanityResult.description }, { status: 200 })
  } catch (error) {
    return handleError(error)
  }
}

export default zodValidate({ queryParams: UPDATE_BRAND_PARAMS_VALIDATION_SCHEMA, bodyParams: UPDATE_BRAND_BODY_VALIDATION_SCHEMA })(
  updateCategory,
)
