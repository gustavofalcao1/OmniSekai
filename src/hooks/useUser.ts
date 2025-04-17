import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import { User } from 'firebase/auth'

type UserData = {
  name: string
  level: number
  xp: number
  stats: { [key: string]: number }
  createdAt: any
  updatedAt: any
  __missing?: string[]
}

export function useUser(user: User | null, ready: boolean = true) {
  const [profile, setProfile] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!user || !ready) return

    const unsubscribe = onSnapshot(
      doc(db, 'users', user.uid),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as UserData
        
          // Define missing fields based on current schema
          const missing: string[] = []
        
          if (!data.stats) missing.push('stats')
          if (!data.name) missing.push('name')
          if (!('level' in data)) missing.push('level')
          if (!('xp' in data)) missing.push('xp')
        
          setProfile({ ...data, __missing: missing })
          setLoading(false)
        } else {
          router.push('/start')
        }
      },
      (error) => {
        console.error('Error subscribing to user document:', error)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [user, ready, router])

  return { profile, loading }
}

