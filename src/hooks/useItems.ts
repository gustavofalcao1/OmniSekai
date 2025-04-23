import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { ItemData } from '@/types/items'

export function useItems() {
  const [items, setItems] = useState<Record<string, ItemData>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const snap = await getDocs(collection(db, 'items'))
        const data: Record<string, ItemData> = {}
        snap.forEach((doc) => {
          data[doc.id] = doc.data() as ItemData
        })
        setItems(data)
      } catch (err) {
        console.error('Failed to load items:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  return items
}
