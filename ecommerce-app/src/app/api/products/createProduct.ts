import { handleError, zodValidate } from '@/utility'
import { prismaClient } from '@clients'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const CREATE_PRODUCT_VALIDATION_SCHEMA = z.object({
  name: z
    .string({ message: 'Please enter a name' })
    .min(1, { message: 'Name must be at least 1 character long' })
    .max(255, { message: 'Name must be at most 255 characters long' }),
  description: z
    .string({ message: 'Please enter a description' })
    .min(1, { message: 'Description must be at least 1 character long' })
    .max(255, { message: 'Description must be at most 255 characters long' }),
  price: z.coerce
    .number({ message: 'Please enter a price' })
    .min(1, { message: 'Price must be at least 1' })
    .max(1000000, { message: 'Prisce must be at most 1000000' }),
  brandId: z.string({ message: 'Please enter a brandId' }).uuid({ message: 'Invalid brandId' }),
  categoryId: z.string({ message: 'Please enter a categoryId' }).uuid({ message: 'Invalid categoryId' }),
  quantity: z.coerce
    .number({ message: 'Please enter a quantity' })
    .min(1, { message: 'Quantity must be at least 1' })
    .max(1000000, { message: 'Quantity must be at most 1000000' }),
  sku: z.string({ message: 'Please enter a sku' }).min(1, { message: 'Sku must be at least 1 character long' }),
})

interface CreateProductPayload {
  body: z.infer<typeof CREATE_PRODUCT_VALIDATION_SCHEMA>
}

const createProduct = async (payload: CreateProductPayload) => {
  try {
    console.log('payload', payload)
    const { price, brandId, categoryId, quantity, sku } = payload.body
    const product = await prismaClient.product.create({
      data: {
        price,
        brandId,
        categoryId,
        quantity,
        sku,
      },
    })
    console.log('result', product)
    return NextResponse.json({ ...product }, { status: 200 })
  } catch (error) {
    return handleError(error)
  }
}

export default zodValidate({ bodyParams: CREATE_PRODUCT_VALIDATION_SCHEMA })(createProduct)
