import { sanityClient } from '@/lib/clients'

/**
 * Checks if a slug is unique within the same document type in Sanity.
 *
 * @param {string} slug - The slug to check for uniqueness.
 * @param {string} type - The document type to check within.
 * @returns {Promise<void>} - A promise that resolves if the slug is unique, or throws an error if it is not.
 * @throws {Error} - Throws an error if the slug is not unique.
 */
export async function isSlugUniqueWithinSanity(slug: string, type: string): Promise<void> {
  const params = {
    slug,
    type,
  }
  const query = `count(*[_type == $type && slug == $slug]) > 0`
  const result = await sanityClient.fetch(query, params)
  if (result) {
    throw new Error(`The slug "${slug}" is already in use within the "${type}" document type.`)
  }
}
