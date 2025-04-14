import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import { User } from 'firebase/auth'

type UserData = {
  name: string
  level: number
  xp: number
  createdAt: any
  updatedAt: any
}

export function useUser(user: User | null) {
  const [profile, setProfile] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!user) return

    const fetchUserData = async () => {
      const userRef = doc(db, 'users', user.uid)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        setProfile(userSnap.data() as UserData)
      } else {
        router.push('/start')
      }

      setLoading(false)
    }

    fetchUserData()
  }, [user, router])

  return { profile, loading }
}
