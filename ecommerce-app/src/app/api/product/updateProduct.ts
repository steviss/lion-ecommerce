const updateProduct = (req: Request) => {
  console.log('PUT /api/product')
  console.debug(req)
  return new Response(JSON.stringify({ message: 'Hello from Next.js! PUT' }), {
    status: 200,
  })
}

export default updateProduct
