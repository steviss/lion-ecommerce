import { getParams } from '@/utility';
import { NextRequest, NextResponse } from 'next/server';

const getUser = async (req: NextRequest) => {
  return NextResponse.json({ message: 'Hello from Next.js! GET', payload: req.json() })
}

const getUsers = async (req: NextRequest) => {
  return NextResponse.json({ message: 'Hello from Next.js! GETs', payload: req.json() })
}

const getUsersRoute = async (req: NextRequest) => {
  const { params } = getParams(req.url)
  if (params.has('id')) {
    return getUser(req)
  }
  return getUsers(req)
}

export default getUsersRoute
