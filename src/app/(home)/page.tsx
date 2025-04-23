'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useUser } from '@/hooks/useUser'
import { useQuests } from '@/hooks/useQuests'
import AddQuestModal from '@/components/AddQuestModal'
import { CheckCircle, ChevronDown, ChevronUp, Ban } from 'lucide-react'
import { getIcon } from "@/lib/icons"
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation'
import { completeQuest } from '@/lib/quests'
import { useSystemConfig } from '@/hooks/useSystemConfig'
import QuestCard from '@/components/QuestCard'

export default function QuestsPage() {
  const { user, loading: authLoading } = useAuth()
  const { profile, loading: userLoading } = useUser(user, !authLoading)
  const { quests, loading: questsLoading } = useQuests(user, !authLoading)

  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [showModal, setShowModal] = useState(false)

  const { config, loading: configLoading } = useSystemConfig()

  useSwipeNavigation(!showModal)
  
  if (!user) return null

  if (authLoading || userLoading || questsLoading || configLoading || !profile || !config) return null

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center px-4 pt-6 pb-24 gap-4">
      <section className="w-full max-w-md flex flex-col gap-3 mt-30">
        {quests.map((quest) => (
          <QuestCard key={quest.id} quest={quest} user={user} config={config} />
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
