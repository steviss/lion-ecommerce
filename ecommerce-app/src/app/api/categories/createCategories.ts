import { handleError } from '@/utility'
import { NextRequest, NextResponse } from 'next/server'

const createCategories = async (req: NextRequest) => {
  try {
    return NextResponse.json({ message: 'Welcome to the POST Categories route!', payload: req.json() }, { status: 200 })
  } catch (error) {
    return handleError(error)
  }
}

export default createCategories
