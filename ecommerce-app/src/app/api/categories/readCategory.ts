import { prismaClient, sanityClient } from '@/lib/clients'
import { SanityCategoryType } from '@/types'
import { findyManyByType, getParams, zodValidate } from '@/utility'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const READ_CATEGORY_VALIDATION_SCHEMA = z.object({
  id: z.string({ message: 'Please enter an id' }).uuid({ message: 'Please enter a valid id' }),
})

interface GetCategoryPayload {
  query: z.infer<typeof READ_CATEGORY_VALIDATION_SCHEMA>
}

const getCategory = async (payload: GetCategoryPayload) => {
  const { id } = payload.query
  const result = await prismaClient.category.findUniqueOrThrow({ where: { id } })
  const sanityResult = await sanityClient.getDocument(result.sanityId)
  return NextResponse.json({ ...result, ...sanityResult }, { status: 200 })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCategories = async (_req: NextRequest) => {
  const categories = await prismaClient.category.findMany()
  const sanityResults = await findyManyByType<SanityCategoryType>('category')
  const results = categories.map((category) => {
    const sanityResult = sanityResults.find((result) => result._id === category.sanityId)
    return { ...category, name: sanityResult?.name, description: sanityResult?.description }
  })

  return NextResponse.json({ items: results }, { status: 200 })
}

const getCategoriesRoute = async (req: NextRequest) => {
  const { params } = getParams(req.url)
  if (params.has('id')) {
    return zodValidate({ queryParams: READ_CATEGORY_VALIDATION_SCHEMA })(getCategory)(req)
  }
  return getCategories(req)
}

export default getCategoriesRoute
