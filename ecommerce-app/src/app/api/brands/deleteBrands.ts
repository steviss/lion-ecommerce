import { prismaClient, sanityClient } from '@/lib/clients'
import { handleError, zodValidate } from '@/utility'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const DELETE_CATEGORY_VALIDATION_SCHEMA = z.object({
  id: z.string({ message: 'Please enter an id' }).uuid({ message: 'Please enter a valid id' }),
})

interface DeleteBrandPayload {
  query: z.infer<typeof DELETE_CATEGORY_VALIDATION_SCHEMA>
}

const deleteBrands = async (payload: DeleteBrandPayload) => {
  try {
    const brand = await prismaClient.brand.findUniqueOrThrow({ where: { id: payload.query.id } })
    await prismaClient.brand.delete({ where: { id: brand.id } })
    await sanityClient.delete(brand.sanityId)
    return NextResponse.json({ message: `Succesfully deleted a brand with the id: ${payload.query.id}` }, { status: 200 })
  } catch (error) {
    return handleError(error)
  }
}

export default zodValidate({ queryParams: DELETE_CATEGORY_VALIDATION_SCHEMA })(deleteBrands)
