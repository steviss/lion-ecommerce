import {SlugValidationContext} from 'sanity'

export async function isSlugUniqueWithinSameDocuments(
  slug: string,
  context: SlugValidationContext,
) {
  const {document, getClient} = context
  const client = getClient({apiVersion: '2022-12-07'})
  const id = document?._id.replace(/^drafts\./, '')
  const type = document?._type
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
    type,
  }
  const query = `!defined(*[!(_id in [$draft, $published]) && _type == $type && slug.current == $slug][0]._id)`
  const result = await client.fetch(query, params)
  return result
}
