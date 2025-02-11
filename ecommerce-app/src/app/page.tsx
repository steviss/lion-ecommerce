import { clientConfig, serverConfig } from '@firebase-config'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

import HomePage from './HomePage'

export default async function Home() {
  const tokens = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: {
      ...serverConfig.serviceAccount,
      privateKey: serverConfig.serviceAccount.privateKey || '',
    },
  })

  if (!tokens) {
    notFound()
  }

  return <HomePage email={tokens?.decodedToken.email} />
}
