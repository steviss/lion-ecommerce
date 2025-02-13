import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2025-02-06',
  token: process.env.SANITY_API_TOKEN,
})
