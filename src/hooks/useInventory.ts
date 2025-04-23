import { useAuth } from '@/hooks/useAuth'
import { useUser } from '@/hooks/useUser'
import { useItems } from '@/hooks/useItems'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { ItemData } from '@/types/items'
import type { InventoryData } from '@/types/inventory'

type InventoryItem = ItemData & InventoryData

export function useInventory(): InventoryItem[] {
  const { user } = useAuth()
  const { profile } = useUser(user)
  const items = useItems()

  const [inventory, setInventory] = useState<InventoryData[]>([])

  useEffect(() => {
    if (!user?.uid) return

    const q = query(collection(db, `users/${user.uid}/inventory`))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: InventoryData[] = snapshot.docs.map((doc) => {
        const raw = doc.data()
        return {
          id: doc.id,
          itemId: raw.itemId,
          quantity: raw.quantity,
          obtainedAt: raw.obtainedAt?.toDate().toISOString() ?? '',
          expiresAt: raw.expiresAt?.toDate().toISOString(),
        }
      })

      setInventory(data)
    })

    return () => unsubscribe()
  }, [user])

  const combined: InventoryItem[] = inventory
    .filter((entry) => items[entry.itemId])
    .map((entry) => ({
      ...entry,
      ...items[entry.itemId],
    }))

  return combined
}
