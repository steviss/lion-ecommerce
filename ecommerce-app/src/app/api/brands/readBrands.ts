import { getParams } from '@/utility';
import { NextRequest, NextResponse } from 'next/server';

const getBrand = async (req: NextRequest) => {
  return NextResponse.json({ message: 'Hello from Next.js! GET', payload: req.json() })
}

const getBrands = async (req: NextRequest) => {
  return NextResponse.json({ message: 'Hello from Next.js! GETs', payload: req.json() })
}

const getBrandsRoute = async (req: NextRequest) => {
  const { params } = getParams(req.url)
  if (params.has('id')) {
    return getBrand(req)
  }
  return getBrands(req)
}

export default getBrandsRoute
