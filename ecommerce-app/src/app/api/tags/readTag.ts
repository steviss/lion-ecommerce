import { prismaClient, sanityClient } from '@/lib/clients'
import { SanityTagType } from '@/types'
import { findyManyByType, getParams, zodValidate } from '@/utility'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { TAG_TYPE } from './createTag'

const READ_TAG_VALIDATION_SCHEMA = z.object({
  id: z.string({ message: 'Please enter an id' }).uuid({ message: 'Please enter a valid id' }),
})

interface GetTagPayload {
  query: z.infer<typeof READ_TAG_VALIDATION_SCHEMA>
}

const getTag = async (payload: GetTagPayload) => {
  const { id } = payload.query
  const tag = await prismaClient.tag.findUniqueOrThrow({ where: { id } })
  const sanityResult = await sanityClient.getDocument(tag.sanityId)
  return NextResponse.json({ ...tag, ...sanityResult }, { status: 200 })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getTags = async (_req: NextRequest) => {
  const tags = await prismaClient.tag.findMany()
  const sanityResults = await findyManyByType<SanityTagType>(TAG_TYPE)
  const results = tags.map((tag) => {
    const sanityResult = sanityResults.find((result) => result._id === tag.sanityId)
    return { ...tag, name: sanityResult?.name, description: sanityResult?.description }
  })

  return NextResponse.json({ items: results }, { status: 200 })
}

const getTagsRoute = async (req: NextRequest) => {
  const { params } = getParams(req.url)
  if (params.has('id')) {
    return zodValidate({ queryParams: READ_TAG_VALIDATION_SCHEMA })(getTag)(req)
  }
  return getTags(req)
}

export default getTagsRoute
