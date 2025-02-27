import { prismaClient, sanityClient } from '@/lib/clients'
import { handleError, zodValidate } from '@/utility'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const DELETE_TAG_VALIDATION_SCHEMA = z.object({
  id: z.string({ message: 'Please enter an id' }).uuid({ message: 'Please enter a valid id' }),
})

interface DeleteBrandPayload {
  query: z.infer<typeof DELETE_TAG_VALIDATION_SCHEMA>
}

const deleteTags = async (payload: DeleteBrandPayload) => {
  try {
    const tag = await prismaClient.tag.findUniqueOrThrow({ where: { id: payload.query.id } })
    await prismaClient.brand.delete({ where: { id: tag.id } })
    await sanityClient.delete(tag.sanityId)
    return NextResponse.json({ message: `Succesfully deleted a tag with the id: ${payload.query.id}` }, { status: 200 })
  } catch (error) {
    return handleError(error)
  }
}

export default zodValidate({ queryParams: DELETE_TAG_VALIDATION_SCHEMA })(deleteTags)
