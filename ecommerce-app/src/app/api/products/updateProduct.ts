import { prismaClient, sanityClient } from '@/lib/clients'
import { zodValidate } from '@/utility'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { CREATE_PRODUCT_VALIDATION_SCHEMA } from './createProduct'

const UPDATE_PRODUCT_VALIDATION_BODY_SCHEMA = CREATE_PRODUCT_VALIDATION_SCHEMA.partial()

const UPDATE_PRODUCT_VALIDATION_QUERY_SCHEMA = z.object({
  id: z.string({ message: 'Please enter an id' }).uuid({ message: 'Please enter a valid id' }),
})

interface UpdateProductPayload {
  body: z.infer<typeof UPDATE_PRODUCT_VALIDATION_BODY_SCHEMA>
  query: z.infer<typeof UPDATE_PRODUCT_VALIDATION_QUERY_SCHEMA>
}

const updateProduct = async (payload: UpdateProductPayload) => {
  const {
    query: { id },
    body: { brandId, categoryId, price, description, name, quantity, sku },
  } = payload
  const product = await prismaClient.product.findUniqueOrThrow({ where: { id } })
  await prismaClient.product.update({ where: { id: product.id }, data: { brandId, categoryId, price, quantity, sku } })
  if (typeof name === 'undefined' || typeof description === 'undefined') return NextResponse.json({ ...product }, { status: 200 })
  const sanityResult = await sanityClient
    .patch(product.sanityId, {
      set: { name, description },
    })
    .commit()
  return NextResponse.json({ ...product, name: sanityResult.name, description: sanityResult.description }, { status: 200 })
}

export default zodValidate({ queryParams: UPDATE_PRODUCT_VALIDATION_QUERY_SCHEMA, bodyParams: UPDATE_PRODUCT_VALIDATION_BODY_SCHEMA })(
  updateProduct,
)
