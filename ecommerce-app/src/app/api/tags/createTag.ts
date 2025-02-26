import { prismaClient, sanityClient } from '@/lib/clients'
import { generateSlug, handleError, isSlugUniqueWithinSanity, zodValidate } from '@/utility'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export const CREATE_TAGS_VALIDATION_SCHEMA = z.object({
  name: z
    .string({ message: 'Please enter a name' })
    .min(1, { message: 'Name must be at least 1 character long' })
    .max(255, { message: 'Name must be at most 255 characters long' }),
  description: z
    .string({ message: 'Please enter a description' })
    .min(1, { message: 'Description must be at least 1 character long' })
    .max(255, { message: 'Description must be at most 255 characters long' }),
})

interface CreateTagPayload {
  body: z.infer<typeof CREATE_TAGS_VALIDATION_SCHEMA>
}

export const TAG_TYPE = 'tag'

const createTags = async (payload: CreateTagPayload) => {
  try {
    const generatedSlug = generateSlug(payload.body.name)
    await isSlugUniqueWithinSanity(generatedSlug, TAG_TYPE)
    const { _id, name, description, slug } = await sanityClient.create({
      _type: TAG_TYPE,
      name: payload.body.name,
      slug: generatedSlug,
      description: payload.body.description,
    })
    const tag = await prismaClient.tag.create({
      data: {
        sanityId: _id,
      },
    })

    return NextResponse.json({ name, description, slug, ...tag }, { status: 200 })
  } catch (error) {
    return handleError(error)
  }
}

export default zodValidate({ bodyParams: CREATE_TAGS_VALIDATION_SCHEMA })(createTags)
