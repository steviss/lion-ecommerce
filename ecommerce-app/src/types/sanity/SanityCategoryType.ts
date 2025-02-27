export type SanityCategoryType = {
  [key: string]: unknown
  _id: string
  _type: 'category'
  name: string
  slug: {
    _type: 'slug'
    current: string
  }
  description: string
}
