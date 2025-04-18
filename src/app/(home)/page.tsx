'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useUser } from '@/hooks/useUser'
import { useQuests } from '@/hooks/useQuests'
import AddQuestModal from '@/components/AddQuestModal'
import { CheckCircle, ChevronDown, ChevronUp, Ban } from 'lucide-react'
import { getIcon } from "@/lib/icons"
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation'

export default function QuestsPage() {
  const { user, loading: authLoading } = useAuth()
  const { profile, loading: userLoading } = useUser(user, !authLoading)
  const { quests, loading: questsLoading } = useQuests(user, !authLoading)

  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [showModal, setShowModal] = useState(false)

  useSwipeNavigation(!showModal)

  if (authLoading || userLoading || questsLoading || !profile) return null

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center px-4 pt-6 pb-24 gap-4">
      <section className="w-full max-w-md flex flex-col gap-3 mt-30">
        {quests.map((quest) => (
          <div key={quest.id} className="card p-4">
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
              <button className="text-accent pt-2 items-center gap-1 hover:opacity-80 transition">
                <CheckCircle size={24} />
              </button>
            </div>

            <button
              onClick={() => toggleExpand(quest.id)}
              className="text-xs text-white/50 hover:text-white/80 flex items-center gap-1 transition mt-2"
            >
              {expanded[quest.id] ? (
                <>
                  <ChevronUp size={14} /> Ocultar detalhes
                </>
              ) : (
                <>
                  <ChevronDown size={14} /> Ver detalhes
                </>
              )}
            </button>

            {expanded[quest.id] && (
              <div className="mt-3 text-xs text-white/60 space-y-2 bg-white/5 rounded-lg p-3">
                {quest.description && <p>{quest.description}</p>}
                <ul className="space-y-1">
                  <li className='flex flex-row items-center'>
                    • &nbsp; {getIcon('xp') ?? <Ban size={12} />} &nbsp; {quest.rewardXP} XP
                  </li>
                  {Object.entries(quest.rewardStats || {}).map(([stat, value]) => (
                    <li className='flex flex-row items-center' key={stat}>
                      • &nbsp; {getIcon('status', stat) ?? <Ban size={12} />} &nbsp; {value} {stat}
                    </li>
                  ))}
                  {quest.rewardItem && (
                    <li className='flex flex-row items-center'>
                      • &nbsp; {getIcon('item') ?? <Ban size={12} />} &nbsp; {quest.rewardItem}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        ))}
      </section>

      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-26 right-6 bg-accent text-3xl text-black rounded-full px-4 py-2 shadow-lg"
      >
        +
      </button>

      {showModal && <AddQuestModal onClose={() => setShowModal(false)} />}
    </main>
  )
}
