import { getParams } from '@/utility';
import { NextRequest, NextResponse } from 'next/server';

const getTag = async (req: NextRequest) => {
  return NextResponse.json({ message: 'Hello from Next.js! GET', payload: req.json() })
}

const getTags = async (req: NextRequest) => {
  return NextResponse.json({ message: 'Hello from Next.js! GETs', payload: req.json() })
}

const getTagRoute = async (req: NextRequest) => {
  const { params } = getParams(req.url)
  if (params.has('id')) {
    return getTag(req)
  }
  return getTags(req)
}

export default getTagRoute
