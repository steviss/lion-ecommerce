import { getParams, zodValidate } from '@/utility'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const READ_PRODUCT_VALIDATION_SCHEMA = z.object({
  id: z.string({ message: 'Please enter an id' }).uuid({ message: 'Please enter a valid id' }).nullable(),
})

interface GetProductsPayload {
  query: z.infer<typeof READ_PRODUCT_VALIDATION_SCHEMA>
}

const getProduct = async (payload: GetProductsPayload) => {
  console.log('GET /api/product', payload)
  console.debug(payload)
  return NextResponse.json({ message: 'Hello from Next.js! GET' })
}

const getProducts = async (req: NextRequest) => {
  console.log('GET /api/products')
  console.debug(req)
  return NextResponse.json({ message: 'Hello from Next.js! GETs' })
}

const getProductsRoute = async (req: NextRequest) => {
  const { params } = getParams(req.url)
  if (params.has('id')) {
    return zodValidate({ queryParams: READ_PRODUCT_VALIDATION_SCHEMA })(getProduct)(req)
  }
  return getProducts(req)
}

export default getProductsRoute
