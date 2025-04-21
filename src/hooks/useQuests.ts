import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where
} from 'firebase/firestore'
import { User } from 'firebase/auth'
import { QuestData } from '@/types/quests'

export function useQuests(user: User | null, ready: boolean = true) {
  const [quests, setQuests] = useState<QuestData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || !ready) return

    const q = query(
      collection(db, `users/${user.uid}/quests`),
      where('status', 'in', ['pending', null]), // status padrão
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as QuestData)
      )
      setQuests(data)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user, ready])

  return { quests, loading }
}
