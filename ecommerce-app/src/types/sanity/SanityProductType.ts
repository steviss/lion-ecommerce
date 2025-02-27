export type SanityProductType = {
  [key: string]: unknown
  _id: string
  _type: 'product'
  slug: {
    _type: 'slug'
    current: string
  }
  name: string
  featuredImage?: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
    hotspot?: boolean
  }
  gallery?: {
    _type: 'gallery'
    images: Array<{
      _type: 'image'
      asset: {
        _ref: string
        _type: 'reference'
      }
    }>
  }
  description?: string
  body?: Array<{
    _type: 'block'
    children: Array<{
      _type: 'span'
      text: string
    }>
  }>
}
