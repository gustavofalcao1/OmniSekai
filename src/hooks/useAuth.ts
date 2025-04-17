import { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useRouter } from 'next/navigation'

export function useAuth(protectedRoute = true) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)

      if (!currentUser && protectedRoute) {
        router.push('/login')
      }
    })

    return () => unsubscribe()
  }, [router, protectedRoute])

  return { user, loading }
}
