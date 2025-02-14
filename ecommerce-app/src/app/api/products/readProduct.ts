import { zodValidateQuery } from '@/utility'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const READ_PRODUCT_VALIDATION_SCHEMA = z.object({
  id: z.string({ message: 'Please enter an id' }).uuid({ message: 'Please enter a valid id' }).nullable(),
})

const getProduct = async (req: NextRequest) => {
  console.log('GET /api/product')
  console.debug(req)
  return NextResponse.json({ message: 'Hello from Next.js! GET' })
}

const getProducts = async (req: NextRequest) => {
  console.log('GET /api/products')
  console.debug(req)
  return NextResponse.json({ message: 'Hello from Next.js! GET' })
}

const getProductsRoute = async (req: NextRequest) => {
  const params = new URL(req.url).searchParams
  if (params.has('id')) {
    return getProduct(req)
  }
  return getProducts(req)
}

export default zodValidateQuery(READ_PRODUCT_VALIDATION_SCHEMA)(getProductsRoute)
