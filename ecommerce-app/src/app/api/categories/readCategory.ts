import { getParams } from '@/utility';
import { NextRequest, NextResponse } from 'next/server';

const getCategory = async (req: NextRequest) => {
  return NextResponse.json({ message: 'Hello from Next.js! GET', payload: req.json() })
}

const getCategories = async (req: NextRequest) => {
  return NextResponse.json({ message: 'Hello from Next.js! GETs', payload: req.json() })
}

const getCategoriesRoute = async (req: NextRequest) => {
  const { params } = getParams(req.url)
  if (params.has('id')) {
    return getCategory(req)
  }
  return getCategories(req)
}

export default getCategoriesRoute
