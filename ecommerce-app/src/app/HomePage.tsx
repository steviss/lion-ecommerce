'use client'

import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'

import { app } from '../firebase'

interface HomePageProps {
  email?: string
}

export default function HomePage({ email }: HomePageProps) {
  const router = useRouter()

  async function handleLogout() {
    await signOut(getAuth(app))

    await fetch('/api/logout')

    router.push('/login')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-4 text-xl">Super secure home page</h1>
      <p className="mb-8">
        Only <strong>{email}</strong> holds the magic key to this kingdom!
      </p>
      <button
        onClick={handleLogout}
        className="focus:ring-primary-300 dark:focus:ring-primary-800 rounded-lg bg-gray-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 dark:bg-gray-600 dark:hover:bg-gray-700"
      >
        Logout
      </button>
    </main>
  )
}
