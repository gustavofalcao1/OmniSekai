'use client'

import { useItems } from '@/hooks/useItems'
import { X } from 'lucide-react'
import { useState } from 'react'

type ItemWithQuantity = {
  itemId: string
  quantity: number
}

type Props = {
  initial?: ItemWithQuantity[]
  onClose: () => void
  onConfirm: (items: ItemWithQuantity[]) => void
}

export default function ItemSelectModal({ onClose, onConfirm, initial = [] }: Props) {
  const items = useItems()
  const [selected, setSelected] = useState<ItemWithQuantity[]>(initial)

  const toggleItem = (itemId: string) => {
    setSelected((prev) => {
      const exists = prev.find((i) => i.itemId === itemId)
      if (exists) {
        return prev.filter((i) => i.itemId !== itemId)
      } else {
        return [...prev, { itemId, quantity: 1 }]
      }
    })
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    setSelected((prev) =>
      prev.map((item) =>
        item.itemId === itemId ? { ...item, quantity: quantity || 1 } : item
      )
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
      <div className="card w-full max-w-md p-4 text-white relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/50 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold mb-4 text-accent">Selecionar Itens</h2>

        <div className="grid grid-cols-3 gap-3">
          {Object.entries(items).map(([id, item]) => {
            const isSelected = selected.some((s) => s.itemId === id)
            const currentQty = selected.find((s) => s.itemId === id)?.quantity ?? 1

            return (
              <button
                key={id}
                onClick={() => toggleItem(id)}
                className={`card flex flex-col items-center text-xs p-2 transition-all ${
                  isSelected ? 'border-accent border-2 bg-white/5' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <div className="text-2xl">🎁</div>
                <span className="text-center">{item.name}</span>

                {isSelected && (
                  <div className="mt-2 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (currentQty > 1) updateQuantity(id, currentQty - 1)
                      }}
                      className="px-2 py-1 bg-white/10 rounded text-xs hover:bg-white/20"
                    >
                      -
                    </button>

                    <input
                      type="number"
                      min={1}
                      value={currentQty}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateQuantity(id, parseInt(e.target.value))}
                      className="w-12 text-center bg-black/30 rounded text-white text-xs py-1"
                    />

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        updateQuantity(id, currentQty + 1)
                      }}
                      className="px-2 py-1 bg-white/10 rounded text-xs hover:bg-white/20"
                    >
                      +
                    </button>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <button
          onClick={() => onConfirm(selected)}
          className="mt-6 w-full bg-accent text-black font-bold rounded-lg py-2 hover:opacity-90 transition"
        >
          Selecionar
        </button>
      </div>
    </div>
  )
}
