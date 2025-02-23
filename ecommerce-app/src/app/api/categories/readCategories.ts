import { getParams } from '@/utility';
import { NextRequest, NextResponse } from 'next/server';

const getCategories = async (req: NextRequest) => {
  return NextResponse.json({ message: 'Hello from Next.js! GET', payload: req.json() })
}

const getCategoriess = async (req: NextRequest) => {
  return NextResponse.json({ message: 'Hello from Next.js! GETs', payload: req.json() })
}

const getCategoriesRoute = async (req: NextRequest) => {
  const { params } = getParams(req.url)
  if (params.has('id')) {
    return getCategories(req)
  }
  return getCategoriess(req)
}

export default getCategoriesRoute
