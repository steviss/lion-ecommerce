import { prismaClient, sanityClient } from '@/lib/clients'
import { SanityBrandType } from '@/types'
import { findyManyByType, getParams, zodValidate } from '@/utility'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { BRAND_TYPE } from './createBrands'

const READ_BRAND_VALIDATION_SCHEMA = z.object({
  id: z.string({ message: 'Please enter an id' }).uuid({ message: 'Please enter a valid id' }),
})

interface GetBrandPayload {
  query: z.infer<typeof READ_BRAND_VALIDATION_SCHEMA>
}

const getBrand = async (payload: GetBrandPayload) => {
  const { id } = payload.query
  const brand = await prismaClient.brand.findUniqueOrThrow({ where: { id } })
  const sanityResult = await sanityClient.getDocument(brand.sanityId)
  return NextResponse.json({ ...brand, ...sanityResult }, { status: 200 })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getBrands = async (_req: NextRequest) => {
  const brands = await prismaClient.brand.findMany()
  const sanityResults = await findyManyByType<SanityBrandType>(BRAND_TYPE)
  const results = brands.map((brand) => {
    const sanityResult = sanityResults.find((result) => result._id === brand.sanityId)
    return { ...brand, name: sanityResult?.name, description: sanityResult?.description }
  })

  return NextResponse.json({ items: results }, { status: 200 })
}

const getBrandsRoute = async (req: NextRequest) => {
  const { params } = getParams(req.url)
  if (params.has('id')) {
    return zodValidate({ queryParams: READ_BRAND_VALIDATION_SCHEMA })(getBrand)(req)
  }
  return getBrands(req)
}

export default getBrandsRoute
