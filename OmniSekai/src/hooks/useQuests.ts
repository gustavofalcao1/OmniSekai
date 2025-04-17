'use client'

import { useEffect, useState } from 'react'
import { Quest } from '@/types/quests'
import { db } from '@/lib/firebase'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { User } from 'firebase/auth'

export function useQuests(user: User | null, ready: boolean = true) {
  const [quests, setQuests] = useState<Quest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || !ready) return

    const q = query(collection(db, `users/${user.uid}/quests`), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Quest))
      setQuests(data)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user, ready])

  return { quests, loading }
}
