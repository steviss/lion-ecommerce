export type SanityBrandType = {
  [key: string]: unknown
  _id: string
  _type: 'brand'
  name: string
  slug: {
    _type: 'slug'
    current: string
  }
  description?: string
  brandLogo?: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
  }
}
