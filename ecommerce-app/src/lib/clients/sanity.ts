import { appConfig } from '@config'
import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: appConfig.sanity.projectId,
  dataset: appConfig.sanity.dataset,
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: appConfig.sanity.apiVersion,
  token: appConfig.sanity.token,
})

export default sanityClient
