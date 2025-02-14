import { getParams, zodValidateBody, zodValidateQuery } from '@/utility'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const UPDATE_PRODUCT_VALIDATION_BODY_SCHEMA = z.object({
  name: z
    .string({ message: 'Please enter a name' })
    .min(1, { message: 'Name must be at least 1 character long' })
    .max(255, { message: 'Name must be at most 255 characters long' })
    .nullable(),
  description: z
    .string({ message: 'Please enter a description' })
    .min(1, { message: 'Description must be at least 1 character long' })
    .max(255, { message: 'Description must be at most 255 characters long' })
    .nullable(),
  price: z
    .number({ message: 'Please enter a price ' })
    .min(1, { message: 'Price must be at least 1' })
    .max(1000000, { message: 'Price must be at most 1000000' })
    .nullable(),
})

const UPDATE_PRODUCT_VALIDATION_QUERY_SCHEMA = z.object({
  id: z.string({ message: 'Please enter an id' }).uuid({ message: 'Please enter a valid id' }),
})

const updateProduct = async (req: NextRequest) => {
  console.log('PUT /api/product')
  const { params } = getParams(req.url)
  if (!params.has('id')) {
    return NextResponse.json({ message: 'Please enter an id' }, { status: 400 })
  }
  return NextResponse.json({ message: 'Hello from Next.js! PUT', info: params.get('id') }, { status: 200 })
}

export default zodValidateQuery(UPDATE_PRODUCT_VALIDATION_QUERY_SCHEMA)(
  zodValidateBody(UPDATE_PRODUCT_VALIDATION_BODY_SCHEMA)(updateProduct),
)
