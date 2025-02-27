/**
 * Converts a given text to a slug.
 * @param {string} text - The text to convert to a slug.
 * @returns {string} - The generated slug.
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase() // Convert to lowercase
    .normalize('NFD') // Normalize the text
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim() // Trim leading and trailing spaces
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
}
