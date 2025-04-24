'use client'

import { useAuth } from '@/hooks/useAuth'
import { useUser } from '@/hooks/useUser'
import { useInventory } from '@/hooks/useInventory'
import ItemCard from '@/components/ItemCard'
import ItemModal from '@/components/ItemModal'
import LoadingScreen from '@/components/LoadingScreen'

import { useEffect, useState, useMemo } from 'react'

export default function InventoryPage() {
  const { user, loading: authLoading } = useAuth()
  const { profile, loading } = useUser(user, !authLoading)
  const inventory = useInventory()

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  const [slotCount, setSlotCount] = useState(20)

  const visualItems = useMemo(() => {
    return inventory.flatMap((item) =>
      Array.from({ length: item.quantity }, (_, i) => ({
        ...item,
        id: item.itemId,
        _visualKey: `${item.itemId}-${i}`,
      }))
    )
  }, [inventory])

  useEffect(() => {
    if (visualItems.length >= slotCount - 4) {
      setSlotCount((prev) => prev + 10)
    }
  }, [visualItems.length, slotCount])

  if (authLoading || loading || !profile) return <LoadingScreen />

  const filledSlots = visualItems.map((item) => (
    <ItemCard key={item._visualKey} item={item} onClick={() => setSelectedItemId(item.itemId)} />
  ))  

  const emptySlots = Array.from({ length: slotCount - visualItems.length }).map((_, i) => (
    <div
      key={`empty-${i}`}
      className="card aspect-square opacity-30 border-dashed border-border"
    />
  ))

  return (
    <main className="min-h-screen w-full flex flex-col items-center px-4 pt-6 pb-24 gap-4">
      <section className="w-full max-w-md grid grid-cols-3 sm:grid-cols-4 gap-3 mt-30">
        {filledSlots}
        {emptySlots}
        {selectedItemId && (
          <ItemModal
            item={inventory.find(i => i.itemId === selectedItemId)!}
            onClose={() => setSelectedItemId(null)}
          />
        )}
      </section>
    </main>
  )
}
