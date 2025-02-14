const getProduct = (req: Request) => {
  console.log('GET /api/product')
  console.debug(req)
  return new Response(JSON.stringify({ message: 'Hello from Next.js! GET' }), {
    status: 200,
  })
}

export default getProduct
