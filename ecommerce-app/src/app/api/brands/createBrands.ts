import { prismaClient, sanityClient } from '@/lib/clients'
import { generateSlug, handleError, isSlugUniqueWithinSanity } from '@/utility'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export const CREATE_BRAND_VALIDATION_SCHEMA = z.object({
  name: z
    .string({ message: 'Please enter a name' })
    .min(1, { message: 'Name must be at least 1 character long' })
    .max(255, { message: 'Name must be at most 255 characters long' }),
  description: z
    .string({ message: 'Please enter a description' })
    .min(1, { message: 'Description must be at least 1 character long' })
    .max(255, { message: 'Description must be at most 255 characters long' }),
})

interface CreateBrandPayload {
  body: z.infer<typeof CREATE_BRAND_VALIDATION_SCHEMA>
}

export const BRAND_TYPE = 'brand'

const createBrands = async (payload: CreateBrandPayload) => {
  try {
    const generatedSlug = generateSlug(payload.body.name)
    await isSlugUniqueWithinSanity(generatedSlug, BRAND_TYPE)
    const { _id, name, description, slug } = await sanityClient.create({
      _type: BRAND_TYPE,
      name: payload.body.name,
      slug: generatedSlug,
      description: payload.body.description,
    })
    const brand = await prismaClient.brand.create({
      data: {
        sanityId: _id,
      },
    })

    return NextResponse.json({ name, description, slug, ...brand }, { status: 200 })
  } catch (error) {
    return handleError(error)
  }
}

export default createBrands
