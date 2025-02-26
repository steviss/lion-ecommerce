import { prismaClient, sanityClient } from '@/lib/clients'
import { SanityProductType } from '@/types'
import { findyManyByType, getParams, zodValidate } from '@/utility'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { PRODUCT_TYPE } from './createProduct'

const READ_PRODUCT_VALIDATION_SCHEMA = z.object({
  id: z.string({ message: 'Please enter an id' }).uuid({ message: 'Please enter a valid id' }),
})

interface GetProductsPayload {
  query: z.infer<typeof READ_PRODUCT_VALIDATION_SCHEMA>
}

const getProduct = async (payload: GetProductsPayload) => {
  const { id } = payload.query
  const product = await prismaClient.product.findUniqueOrThrow({ where: { id } })
  const sanityResult = await sanityClient.getDocument(product.sanityId)
  return NextResponse.json({ ...product, ...sanityResult }, { status: 200 })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getProducts = async (_req: NextRequest) => {
  const products = await prismaClient.product.findMany()
  const sanityResults = await findyManyByType<SanityProductType>(PRODUCT_TYPE)
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
