import { zodValidateRequest } from '@/utility'
import { z } from 'zod'

const READ_PRODUCT_VALIDATION_SCHEMA = z.object({
  id: z.string({ message: 'Please enter an id' }).uuid({ message: 'Please enter a valid id' }).nullable(),
})

const getProduct = async (req: Request) => {
  console.log('GET /api/product')
  console.debug(req)
  return new Response(JSON.stringify({ message: 'Hello from Next.js! GET' }), {
    status: 200,
  })
}

export default zodValidateRequest(READ_PRODUCT_VALIDATION_SCHEMA)(getProduct)
