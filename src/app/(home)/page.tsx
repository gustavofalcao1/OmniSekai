'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useUser } from '@/hooks/useUser'
import { useQuests } from '@/hooks/useQuests'
import AddQuestModal from '@/components/AddQuestModal'
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation'
import { useSystemConfig } from '@/hooks/useSystemConfig'
import QuestCard from '@/components/QuestCard'
import LoadingScreen from '@/components/LoadingScreen'

export default function QuestsPage() {
  const { user, loading: authLoading } = useAuth()
  const { profile, loading: userLoading } = useUser(user, !authLoading)
  const { quests, loading: questsLoading } = useQuests(user, !authLoading)

  const [showModal, setShowModal] = useState(false)

  const { config, loading: configLoading } = useSystemConfig()

  useSwipeNavigation(!showModal)
  
  if (!user || authLoading || userLoading || questsLoading || configLoading || !profile || !config) return <LoadingScreen />

  return (
    <main className="min-h-screen w-full flex flex-col items-center px-4 pt-6 pb-24 gap-4">
      <section className="w-full max-w-md flex flex-col gap-3 mt-30">
        {quests.map((quest) => (
          <QuestCard key={quest.id} quest={quest} user={user} config={config} />
        ))}
      </section>

      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-26 md:bottom-28 right-6 md:right-[calc(50vw-220px)] bg-accent text-3xl text-black rounded-full px-4 py-2 shadow-lg"
      >+</button>

      {showModal && <AddQuestModal onClose={() => setShowModal(false)} />}
    </main>
  )
}
