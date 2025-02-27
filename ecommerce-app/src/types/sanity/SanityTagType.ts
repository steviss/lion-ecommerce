export type SanityTagType = {
  [key: string]: unknown
  _id: string
  _type: 'tag'
  name: string
  slug: {
    _type: 'slug'
    current: string
  }
  description?: string
}
