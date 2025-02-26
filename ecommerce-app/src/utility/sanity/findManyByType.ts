import { sanityClient } from '@/lib/clients'

/**
 * Finds many documents of a specific type in Sanity.
 *
 * @template T - The type of the documents to find.
 * @param {string} type - The document type to find.
 * @returns {Promise<T[]>} - A promise that resolves to an array of documents of the specified type.
 * @throws {Error} - Throws an error if there was an issue finding the documents.
 */
export async function findyManyByType<T = unknown>(type: string): Promise<T[]> {
  const params = {
    type,
  }
  const query = `*[_type == $type]`
  const results = await sanityClient.fetch<T[]>(query, params)
  if (results.length === 0) {
    throw new Error(`There was an error finding the documents of type "${type}".`)
  }
  return results
}
