import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import { User } from 'firebase/auth'
import { UserData } from '@/types/users'
import { useSystemConfig } from '@/hooks/useSystemConfig'
import { applyLevelUpIfNeeded } from '@/lib/leveling'

export function useUser(user: User | null, ready: boolean = true) {
  const [profile, setProfile] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { config } = useSystemConfig()

  useEffect(() => {
    if (!user || !ready) return

    const unsubscribe = onSnapshot(
      doc(db, 'users', user.uid),
      async (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as UserData

          const missing: string[] = []
          if (!data.stats) missing.push('stats')
          if (!data.name) missing.push('name')
          if (!('level' in data)) missing.push('level')
          if (!('xp' in data)) missing.push('xp')

          setProfile({ ...data, __missing: missing })
          setLoading(false)

          // ✅ Passive level-up verification
          if (config) {
            await applyLevelUpIfNeeded(data, config, user.uid)
          }
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
  }, [user, ready, router, config])

  return { profile, loading }
}
