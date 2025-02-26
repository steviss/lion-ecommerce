import { CREATE_BRAND_VALIDATION_SCHEMA } from '@/app/api/brands/createBrands'
import { prismaClient, sanityClient } from '@/lib/clients'
import { handleError, zodValidate } from '@/utility'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const UPDATE_TAG_BODY_VALIDATION_SCHEMA = CREATE_BRAND_VALIDATION_SCHEMA.partial()

const UPDATE_TAG_PARAMS_VALIDATION_SCHEMA = z.object({
  id: z.string({ message: 'Please enter an id' }).uuid({ message: 'Please enter a valid id' }),
})

interface UpdateTagPayload {
  body: z.infer<typeof UPDATE_TAG_BODY_VALIDATION_SCHEMA>
  query: z.infer<typeof UPDATE_TAG_PARAMS_VALIDATION_SCHEMA>
}

const updateTag = async (payload: UpdateTagPayload) => {
  try {
    const {
      query: { id },
      body: { description, name },
    } = payload
    const tag = await prismaClient.brand.findUniqueOrThrow({ where: { id } })
    if (typeof name === 'undefined' || typeof description === 'undefined') return NextResponse.json({ ...tag }, { status: 200 })
    const sanityResult = await sanityClient
      .patch(tag.sanityId, {
        set: { name, description },
      })
      .commit()
    return NextResponse.json({ ...tag, name: sanityResult.name, description: sanityResult.description }, { status: 200 })
  } catch (error) {
    return handleError(error)
  }
}

export default zodValidate({ queryParams: UPDATE_TAG_PARAMS_VALIDATION_SCHEMA, bodyParams: UPDATE_TAG_BODY_VALIDATION_SCHEMA })(updateTag)
