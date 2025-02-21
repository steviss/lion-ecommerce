import prisma from '@/lib/prisma'
import { zodValidate } from '@/utility'
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
    .max(1000000, { message: 'Price must be at most 1000000' }),
})

interface CreateProductPayload {
  body: z.infer<typeof CREATE_PRODUCT_VALIDATION_SCHEMA>
}

const createProduct = async (payload: CreateProductPayload) => {
  console.log('data', payload)
  console.log('POST /api/product')
  console.debug(payload)
  return NextResponse.json({ message: 'Hello from Next.js! POST' })
}

export default zodValidate({ bodyParams: CREATE_PRODUCT_VALIDATION_SCHEMA })(createProduct)
