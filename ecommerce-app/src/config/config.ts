interface AppConfigI {
  sanity: {
    projectId: string
    dataset: string
    apiVersion: string
    token: string
  }
}

const config: AppConfigI = {
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
    dataset: process.env.SANITY_DATASET ?? '',
    apiVersion: '2025-02-06',
    token: process.env.SANITY_API_TOKEN ?? '',
  },
}

export default config
