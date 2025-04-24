import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from './useAuth'
import type { SkillData } from '@/types/skills'

export function useSkills() {
  const { user } = useAuth()
  const [skills, setSkills] = useState<SkillData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.uid) return

    const q = query(
      collection(db, `users/${user.uid}/skills`),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as SkillData[]

      setSkills(data)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user?.uid])

  return { skills, loading }
}
