import { prismaClient, sanityClient } from '@/lib/clients'
import { handleError, zodValidate } from '@/utility'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const DELETE_CATEGORY_VALIDATION_SCHEMA = z.object({
  id: z.string({ message: 'Please enter an id' }).uuid({ message: 'Please enter a valid id' }),
})

interface DeleteCategoryPayload {
  query: z.infer<typeof DELETE_CATEGORY_VALIDATION_SCHEMA>
}

const deleteCategory = async (payload: DeleteCategoryPayload) => {
  try {
    const category = await prismaClient.category.findUniqueOrThrow({ where: { id: payload.query.id } })
    await prismaClient.category.delete({ where: { id: category.id } })
    await sanityClient.delete(category.sanityId)
    return NextResponse.json({ message: `Succesfully deleted a catgory with the id: ${payload.query.id}` }, { status: 200 })
  } catch (error) {
    return handleError(error)
  }
}

export default zodValidate({ queryParams: DELETE_CATEGORY_VALIDATION_SCHEMA })(deleteCategory)
