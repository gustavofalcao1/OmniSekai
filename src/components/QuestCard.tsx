'use client'

import { useState } from 'react'
import { getIcon } from '@/lib/icons'
import { completeQuest } from '@/lib/quests'
import type { QuestData } from '@/types/quests'
import { User } from 'firebase/auth'
import { SystemConfig } from '@/hooks/useSystemConfig'
import { useItems } from '@/hooks/useItems'
import { CheckCircle, ChevronUp, ChevronDown, Ban } from 'lucide-react'
import ItemModal from './ItemModal'

type Props = {
  quest: QuestData
  user: User
  config: SystemConfig
}

export default function QuestCard({ quest, user, config }: Props) {
  const [expanded, setExpanded] = useState(false)
  const items = useItems()
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const toggleExpand = () => setExpanded((prev) => !prev)

  return (
    <div className="card p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-white text-sm font-semibold">{quest.title}</p>
          <p className="flex flex-row items-center text-xs text-white/40 mt-1 capitalize">
            <span className="flex items-center gap-1 text-white/40">
              {getIcon('quest', 'time') ?? <Ban size={12} />} {quest.timeType} |
              {getIcon('quest', 'category') ?? <Ban size={12} />} {quest.category} |
              {getIcon('quest', 'difficulty') ?? <Ban size={12} />} {quest.difficulty}
            </span>
          </p>
        </div>

        <button
          onClick={() => completeQuest(user, quest, config)}
          className="text-accent pt-2 items-center gap-1 hover:opacity-80 transition"
          title="Concluir missão"
        >
          <CheckCircle size={24} />
        </button>
      </div>

      <button
        onClick={toggleExpand}
        className="text-xs text-white/50 hover:text-white/80 flex items-center gap-1 transition mt-2"
      >
        {expanded ? <><ChevronUp size={14} /> Ocultar detalhes</> : <><ChevronDown size={14} /> Ver detalhes</>}
      </button>

      {expanded && (
        <div className="mt-3 text-xs text-white/60 space-y-2 bg-white/5 rounded-lg p-3">
          {quest.description && <p>{quest.description}</p>}
          <ul className="space-y-1">
            <li className="flex items-center gap-1">
              • {getIcon('xp') ?? <Ban size={12} />} {quest.rewardXP} XP
            </li>
            {Object.entries(quest.rewardStats || {}).map(([stat, value]) => (
              <li key={stat} className="flex items-center gap-1">
                • {getIcon('status', stat) ?? <Ban size={12} />} {value} {stat}
              </li>
            ))}
            {quest.rewardItem?.map(({ itemId, quantity }) => {
              const item = items[itemId]
              return (
                <li key={itemId} className="flex items-center gap-1">
                  • {getIcon('item') ?? <Ban size={12} />}
                  <button
                    className="underline text-accent hover:text-white transition text-left"
                    onClick={() => setSelectedItem(itemId)}
                  >
                    {quantity}x {item?.name ?? itemId}
                  </button>
                </li>
              )
            })}
            {selectedItem && (
              <ItemModal
                item={items[selectedItem]}
                onClose={() => setSelectedItem(null)}
              />
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
