import { prismaClient } from '@/lib/clients'
import { SanityProductType } from '@/types'
import { findyManyByType, getParams, zodValidate } from '@/utility'
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getProducts = async (_req: NextRequest) => {
  const products = await prismaClient.product.findMany()
  const sanityResults = await findyManyByType<SanityProductType>('product')
  const results = products.map((product) => {
    const sanityResult = sanityResults.find((result) => result._id === product.sanityId)
    return { ...product, name: sanityResult?.name, description: sanityResult?.description }
  })
  return NextResponse.json({ items: results }, { status: 200 })
}

const getProductsRoute = async (req: NextRequest) => {
  const { params } = getParams(req.url)
  if (params.has('id')) {
    return zodValidate({ queryParams: READ_PRODUCT_VALIDATION_SCHEMA })(getProduct)(req)
  }
  return getProducts(req)
}

export default getProductsRoute
