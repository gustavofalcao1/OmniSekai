'use client'

import { getIcon } from '@/lib/icons'
import { Ban, X } from 'lucide-react'
import type { ItemData } from '@/types/items'

export default function ItemModal({ item, onClose }: { item: ItemData; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="card w-[90%] max-w-sm p-6 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/50 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="text-3xl">
            {getIcon('item', item.icon) ?? <Ban size={28} />}
          </div>

          <h2 className="text-lg font-bold">{item.name}</h2>

          {item.rarity && (
            <span className="text-xs text-white/40 uppercase tracking-widest">
              {item.rarity}
            </span>
          )}

          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-36 object-cover rounded-lg mt-2"
            />
          )}

          {item.description && (
            <p className="text-sm text-white/60 mt-2">{item.description}</p>
          )}

          {item.stats && (
            <div className="w-full mt-4 space-y-1 text-sm text-white/70">
              {Object.entries(item.stats).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  {getIcon('status', key) ?? <Ban size={12} />}
                  <span className="capitalize">{key}</span>: {value}
                </div>
              ))}
            </div>
          )}

          {item.expiresAt && (
            <p className="text-xs text-white/40 mt-4">
              Expira em: {new Date(item.expiresAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
