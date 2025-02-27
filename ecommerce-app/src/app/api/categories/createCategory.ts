import { prismaClient, sanityClient } from '@/lib/clients'
import { generateSlug, handleError, isSlugUniqueWithinSanity, zodValidate } from '@/utility'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export const CREATE_CATEGORY_VALIDATION_SCHEMA = z.object({
  name: z
    .string({ message: 'Please enter a name' })
    .min(1, { message: 'Name must be at least 1 character long' })
    .max(255, { message: 'Name must be at most 255 characters long' }),
  description: z
    .string({ message: 'Please enter a description' })
    .min(1, { message: 'Description must be at least 1 character long' })
    .max(255, { message: 'Description must be at most 255 characters long' }),
})

interface CreateCategoryPayload {
  body: z.infer<typeof CREATE_CATEGORY_VALIDATION_SCHEMA>
}

export const CATEGORY_TYPE = 'category'

const createCategory = async (payload: CreateCategoryPayload) => {
  try {
    const generatedSlug = generateSlug(payload.body.name)
    await isSlugUniqueWithinSanity(generatedSlug, CATEGORY_TYPE)
    const { _id, name, description, slug } = await sanityClient.create({
      _type: CATEGORY_TYPE,
      name: payload.body.name,
      slug: generatedSlug,
      description: payload.body.description,
    })
    const category = await prismaClient.category.create({
      data: {
        sanityId: _id,
      },
    })

    return NextResponse.json({ name, description, slug, ...category }, { status: 200 })
  } catch (error) {
    return handleError(error)
  }
}

export default zodValidate({ bodyParams: CREATE_CATEGORY_VALIDATION_SCHEMA })(createCategory)
