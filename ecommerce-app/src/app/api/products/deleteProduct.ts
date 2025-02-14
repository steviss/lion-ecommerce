import { NextRequest, NextResponse } from 'next/server'

const deleteProduct = (req: NextRequest) => {
  console.log('DELETE /api/product')
  console.debug(req)
  return NextResponse.json({ message: 'Hello from Next.js! DELETE' }, { status: 200 })
}

export default deleteProduct
