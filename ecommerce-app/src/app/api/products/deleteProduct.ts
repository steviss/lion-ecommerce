import { prismaClient, sanityClient } from '@/lib/clients'
import { handleError, zodValidate } from '@/utility'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const DELETE_PRODUCT_VALIDATION_SCHEMA = z.object({
  id: z.string().uuid().nonempty(),
})

interface DeleteCategoryPayload {
  query: z.infer<typeof DELETE_PRODUCT_VALIDATION_SCHEMA>
}

const deleteProduct = async (payload: DeleteCategoryPayload) => {
  try {
    const product = await prismaClient.product.findUniqueOrThrow({ where: { id: payload.query.id } })
    await prismaClient.product.delete({ where: { id: product.id } })
    await sanityClient.delete(product.sanityId)
    return NextResponse.json({ message: `Succesfully deleted a catgory with the id: ${payload.query.id}` }, { status: 200 })
  } catch (error) {
    return handleError(error)
  }
}

export default zodValidate({ queryParams: DELETE_PRODUCT_VALIDATION_SCHEMA })(deleteProduct)
