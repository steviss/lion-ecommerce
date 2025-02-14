const deleteProduct = (req: Request) => {
  console.log('DELETE /api/product')
  console.debug(req)
  return new Response(JSON.stringify({ message: 'Hello from Next.js! DELETE' }), {
    status: 200,
  })
}

export default deleteProduct
